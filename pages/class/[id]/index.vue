<script setup lang="ts">
import { type IClassroom } from "../../../types/Classroom";
import {
  EAttendeeStatus,
  type IForm,
  type IFormSubmission,
} from "../../../types/Form";
import type { IUser } from "../../../types/User";
import type { IVenue } from "../../../types/Venue";

const router = useRouter();
const toast = useToast();
let classroomId = router.currentRoute.value.params.id?.toString();

const { getClassroomById } = useClassroom();
const { getUserFormSubmissions, getFormById, getUserInClassroom } =
  useClassroomForm();
const { getVenueByIds } = useVenue();
const { getUserById, getUserProfile } = useUser();
const { sendClassroomRequest } = useRequestClassroom();

const userFormSubmission = ref<IFormSubmission>();
const usersInClassroom = ref<Partial<IUser>[]>([]);
const classroomForm = ref<IForm>({} as IForm);
let classroom = ref<IClassroom>({} as IClassroom);
let owner = ref<IUser>({} as IUser);
let venues = ref<IVenue[]>([]);
const userProfile = ref<IUser>({} as IUser);

const isUserCheckedIn = computed(() => {
  return userFormSubmission.value?.attendeesStatus.some(
    (attendee) => attendee.attendeesStatus === EAttendeeStatus.Present
  );
});
const isRegistered = computed(() => {
  return userFormSubmission.value ? true : false;
});
const isFormOpen = computed(() => {
  if (!classroomForm.value.openDate) return true;
  return new Date() > isoToDateWithTimezone(classroomForm.value.openDate);
});
const isFormClosed = computed(() => {
  if (!classroomForm.value.closeDate) return false;
  return new Date() > isoToDateWithTimezone(classroomForm.value.closeDate);
});
const isClassEnded = computed(() => {
  return (
    isoToDateWithTimezone(
      classroom.value.dates[classroom.value.dates.length - 1].date.endDateTime
    ) < new Date()
  );
});
const isOwner = computed(() => {
  return classroom.value.owner === userProfile.value.id;
});
const seatsLeft = computed(() => {
  return classroom.value.capacity - usersInClassroom.value.length;
});

const checkViewAccess = ({
  isOwner,
  isPublished,
  isRegistered,
}: {
  isOwner: boolean;
  isPublished: boolean;
  isRegistered: boolean;
}) => {
  if (!isPublished && isRegistered) return;

  if (!isPublished && !isOwner) {
    router.replace("/404");
  }
};

const onFormSubmitted = (submission: IFormSubmission) => {
  usersInClassroom.value.push(submission.userDetail);
  userFormSubmission.value = submission;
};

const onSendClassroomRequest = async () => {
  try {
    let res = await sendClassroomRequest(classroom.value.id);
    if (res.success) {
      toast.add({
        severity: "success",
        summary: "Request sent",
        detail: `Your request to join "${classroom.value.title}" has been sent.`,
        life: 3000,
        group: "tc",
      });
    }
  } catch (error) {
    toast.add({
      severity: "error",
      summary: "Request failed",
      detail: `There was an error sending your request to join "${classroom.value.title}". Please try again later.`,
      life: 3000,
      group: "tc",
    });
  }
};

const fetchClassroomData = async () => {
  try {
    classroom.value = (await getClassroomById(classroomId)).result;
    userProfile.value = (await getUserProfile()).result;
    usersInClassroom.value = (await getUserInClassroom(classroomId)).result;
  } catch (error) {
    router.replace("/404");
  }
};

const fetchAdditionalData = async () => {
  const venueIds = classroom.value.dates.flatMap((date) =>
    date.venueId.map((id) => id.toString())
  );
  const uniqueVenueIds = [...new Set(venueIds)];

  try {
    owner.value = (await getUserById(classroom.value.owner)).result;
    userFormSubmission.value = (
      await getUserFormSubmissions(userProfile.value.id, classroomId)
    ).result;
    venues.value = (await getVenueByIds(uniqueVenueIds)).result;
    classroomForm.value = (await getFormById(classroom.value.id)).result;
  } catch (error) {
    console.error("Error fetching additional data:", error);
  }
};

await fetchClassroomData();
checkViewAccess({
  isOwner: isOwner.value,
  isPublished: classroom.value.published,
  isRegistered: isRegistered.value,
});
await fetchAdditionalData();

useHead({
  title: `${classroom.value.title} · ClassCraft`,
  meta: [
    {
      name: "description",
      content: `${classroom.value.title} class details.`,
    },
    {
      name: "keywords",
      content: `${classroom.value.title}, class, details`,
    },
  ],
});
</script>
<template>
  <div class="w-full flex flex-col">
    <CtaLabel />
    <Headerbar />
    <div
      class="grid lg:grid-cols-2 gap-x-2 w-full mx-auto mb-3 lg:flex-row md:max-w-screen-lg"
    >
      <div class="w-full mb-2 mx-auto lg:mt-0 lg:m-auto">
        <ClassroomCoverImage
          :url="classroom.coverImage"
          :alt="`${classroom.title} class cover image`"
        />
        <div class="group hidden space-y-2 mt-6 lg:block">
          <p class="text-slate-500">Hosted by</p>
          <nuxt-link :to="`/user/${owner.id}`" class="flex items-center gap-2">
            <img
              :src="owner.profilePicture"
              :alt="`${owner.username} profile picture`"
              class="w-8 h-8 rounded-full"
            />
            <p class="group-hover:text-primary duration-150">
              {{ owner.username }}
            </p>
          </nuxt-link>
        </div>
        <ClassroomCheckInStatus v-if="isUserCheckedIn" />
      </div>
      <div class="space-y-8">
        <div class="bg-white px-6 py-8 border rounded-2xl flex flex-col gap-10">
          <div>
            <div class="mb-4">
              <ClassroomRegistrationCountdown
                v-if="classroomForm.openDate"
                label="Opening in"
                :date="classroomForm.openDate"
              />
              <ClassroomRegistrationCountdown
                v-else-if="classroomForm.closeDate"
                label="Closing in"
                :date="classroomForm.closeDate"
              />
              <h1 class="text-4xl font-bold">
                {{ classroom.title }}
              </h1>
              <div class="group inline-flex items-center gap-2 mt-2 lg:hidden">
                <nuxt-link
                  :to="`/user/${owner.id}`"
                  class="flex items-center gap-1"
                >
                  <img
                    :src="owner.profilePicture"
                    :alt="`${owner.username} profile picture`"
                    class="w-5 h-5 rounded-full"
                  />
                  <p class="text-slate-500">Hosted by</p>
                  <p class="group-hover:text-primary duration-150">
                    {{ owner.username }}
                  </p>
                </nuxt-link>
              </div>
            </div>
            <div class="flex gap-2 flex-wrap">
              <Tag
                icon="pi pi-comment"
                severity="secondary"
                :value="classroom.type"
                rounded
                class="border"
              />
              <Tag
                icon="pi pi-desktop"
                severity="secondary"
                :value="classroom.format"
                rounded
                class="border"
              />
              <Tag
                icon="pi pi-users"
                severity="secondary"
                :value="`${
                  usersInClassroom.length
                } / ${classroom.capacity.toString()}`"
                rounded
                class="border"
              />
            </div>
          </div>
          <div class="space-y-4">
            <ReservationDateTimeLayout :dates="classroom.dates" />
            <ReservationVenueLayout :classroom="classroom" :venues="venues" />
          </div>
          <div class="mb-8">
            <p class="text-slate-500 mb-2">What you will learn</p>
            <div v-html="classroom.details" />
          </div>
          <div>
            <p class="text-slate-500 mb-2">Made for</p>
            <div v-html="classroom.target" />
          </div>
          <div v-if="classroom.prerequisite">
            <p class="text-slate-500 mb-2">Prerequisites</p>
            <div>{{ classroom?.prerequisite }}</div>
          </div>
          <div class="flex flex-col text-center gap-2">
            <Button
              v-if="isOwner"
              size="large"
              icon="pi pi-arrow-right"
              iconPos="right"
              :label="`Manage &quot;${classroom.title}&quot;`"
              rounded
              severity="secondary"
              @click="router.push(`/class/${classroomId}/edit`)"
            />
            <div
              v-else-if="
                isUserCheckedIn &&
                isClassEnded &&
                classroomForm.feedback.length > 0
              "
              class="p-4 border rounded-xl bg-primary-50 flex flex-col gap-4"
            >
              <NuxtLayout
                name="feedback-form"
                :userFormSubmission="userFormSubmission"
                :feedbackForm="classroomForm.feedback"
              />
            </div>
            <ClassroomSubmissionDetail
              v-else-if="isRegistered"
              :userFormSubmission="userFormSubmission"
              :classroomTitle="classroom.title"
            />
            <Button
              v-else-if="
                !classroom.registrationStatus ||
                seatsLeft === 0 ||
                (classroomForm.openDate && !isFormOpen) ||
                (classroomForm.closeDate && isFormClosed)
              "
              @click="onSendClassroomRequest"
              icon="pi pi-bookmark"
              :label="`Add &quot;${classroom.title}&quot; to wishlist`"
              size="large"
              severity="secondary"
              rounded
            />
            <Button
              v-else-if="isClassEnded"
              size="large"
              :label="`Request for &quot;${classroom.title}&quot;`"
              rounded
              outlined
            />
            <ClassroomRegistrationButton
              v-else
              :classroom-title="classroom.title"
              @submitted="onFormSubmitted($event)"
            />
            <div
              v-if="usersInClassroom.length > 0"
              class="flex justify-center items-center gap-2"
            >
              <AvatarGroup class="flex justify-center">
                <Avatar
                  v-for="(user, index) in usersInClassroom.slice(0, 5)"
                  :key="index"
                  :image="user.profilePicture"
                  shape="circle"
                />
              </AvatarGroup>
              <p class="text-slate-500 text-left">
                {{ usersInClassroom.length }} people joined this class
                <span v-if="seatsLeft > 0">({{ seatsLeft }} seats left)</span>
                <span v-else>(Full)</span>
              </p>
            </div>
            <div v-else-if="userProfile.id === classroom.owner" />
            <div
              v-else-if="
                classroom.registrationStatus && usersInClassroom.length === 0
              "
            >
              <p class="text-slate-500">Be the first to join this class</p>
            </div>
          </div>
        </div>
        <ClassMaterialLayout
          v-if="
            classroom?.classMaterials?.length > 0 &&
            (isUserCheckedIn || isOwner)
          "
          :classMaterials="classroom.classMaterials"
        />
        <InstructorLayout :classroom="classroom" />
      </div>
    </div>
  </div>
</template>
