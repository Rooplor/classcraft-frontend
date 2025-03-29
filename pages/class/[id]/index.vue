<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { EVenueRequestStatus, type IClassroom } from "../../../types/Classroom";
import {
  EAttendeeStatus,
  type IForm,
  type IFormSubmission,
} from "../../../types/Form";
import type { IUser } from "../../../types/User";
import type { IVenue } from "../../../types/Venue";

const router = useRouter();
let classroomId = router.currentRoute.value.params.id?.toString();

const { getClassroomById } = useClassroom();
const { getUserFormSubmissions, getFormById, getUserInClassroom } =
  useClassroomForm();
const { getVenueByIds } = useVenue();
const { getUserById, getUserProfile } = useUser();
const auth = useFirebaseAuth();

const userFormSubmission = ref<IFormSubmission>();
const usersInClassroom = ref<Partial<IUser>[]>([]);
const classroomForm = ref<IForm>({} as IForm);
let classroom = ref<IClassroom>({} as IClassroom);
let owner = ref<IUser>({} as IUser);
let venues = ref<IVenue[]>([]);
const userProfile = (await getUserProfile()).result;

const isRegistrationDialogVisible = ref(false);
const isSubmissionDialogVisible = ref(false);

const isUserCheckedIn = computed(() => {
  return userFormSubmission.value?.attendeesStatus.some(
    (attendee) => attendee.attendeesStatus === EAttendeeStatus.Present
  );
});
const isUserRegistered = computed(() => {
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
let seatsLeft = computed(() => {
  return classroom.value.capacity - usersInClassroom.value.length;
});

const signInWithGoogle = async () => {
  if (!auth) return;
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const token = await res.user.getIdToken();
    await useAuth().login(token);
    router.push(`/class/${classroomId}`);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

const checkViewAccess = () => {
  if (!classroom.value.published && userProfile.id !== classroom.value.owner) {
    router.replace("/404");
  }
};

const onFormSubmitted = (submission: IFormSubmission) => {
  isRegistrationDialogVisible.value = false;
  usersInClassroom.value.push(submission.userDetail);
  userFormSubmission.value = submission;
};

const fetchClassroomData = async () => {
  try {
    classroom.value = (await getClassroomById(classroomId)).result;
    userFormSubmission.value = (
      await getUserFormSubmissions(userProfile.id, classroomId)
    ).result;
    usersInClassroom.value = (await getUserInClassroom(classroomId)).result;
  } catch (error) {
    router.replace("/404");
  }
};

const fetchAdditionalData = async () => {
  try {
    owner.value = (await getUserById(classroom.value.owner)).result;
    venues.value = (
      await getVenueByIds(
        classroom.value.dates
          .map((date) => date.venueId.map((id) => id.toString()))
          .flat()
      )
    ).result.filter((venue, index, self) => {
      return index === self.findIndex((t) => t.id === venue.id);
    });
    classroomForm.value = (await getFormById(classroom.value.id)).result;
  } catch (error) {
    console.error("Error fetching additional data:", error);
  }
};

await fetchClassroomData();
checkViewAccess();
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
    <div
      v-if="!userProfile"
      class="inline-flex justify-center items-center gap-4 p-2 bg-primary-100 text-primary border border-primary-300 rounded-lg text-lg text-center m-2 mb-4"
    >
      <p>Join ClassCraft for your full experience</p>
      <Button
        label="Continue with Google"
        icon="pi pi-google"
        rounded
        class="ml-2"
        size="small"
        @click="signInWithGoogle"
      />
    </div>
    <Headerbar />
    <div
      class="grid lg:grid-cols-2 gap-x-2 w-full mx-auto mb-3 lg:flex-row md:max-w-screen-lg"
    >
      <div class="w-full mb-2 mx-auto lg:mt-0 lg:m-auto">
        <div
          v-if="classroom.coverImage"
          class="w-96 m-auto aspect-square rounded-2xl overflow-clip lg:w-full"
        >
          <Image :preview="classroom.coverImage ? true : false">
            <template #image>
              <img
                :src="classroom.coverImage"
                :alt="`${classroom.title} class cover image`"
                class="w-[52rem] bg-slate-200 aspect-square border rounded-2xl object-cover"
              />
            </template>
            <template #original="slotProps">
              <img
                :src="classroom.coverImage"
                :alt="`${classroom.title} class cover image`"
                :style="slotProps.style"
                @click="slotProps.previewCallback"
                class="w-[52rem] h-full aspect-square object-cover p-2"
              />
            </template>
          </Image>
        </div>
        <div
          v-else
          class="hidden w-full max-w-96 m-auto aspect-square bg-slate-200 border rounded-2xl lg:flex justify-center items-center md:max-w-full"
        >
          <i class="pi pi-image text-slate-400" style="font-size: 4rem" />
        </div>
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
        <div
          v-if="isUserCheckedIn"
          class="p-4 border rounded-xl text-green-500 bg-green-100 flex flex-col gap-4 mt-6"
        >
          <p>Checked in</p>
        </div>
      </div>
      <div class="space-y-8">
        <div class="bg-white px-6 py-8 border rounded-2xl flex flex-col gap-10">
          <div>
            <div class="mb-4">
              <p
                v-if="
                  classroomForm.openDate &&
                  isoToDateWithTimezone(classroomForm.openDate) > new Date()
                "
                class="py-1 px-2 text-sm text-primary bg-primary-100 inline-block rounded-lg mb-3"
              >
                {{
                  `Opening in 
                ${countdownTimer(
                  isoToDateWithTimezone(classroomForm.openDate)
                )}`
                }}
              </p>
              <p
                v-else-if="
                  classroomForm.closeDate &&
                  isoToDateWithTimezone(classroomForm.closeDate) > new Date()
                "
                class="py-1 px-2 text-sm text-primary bg-primary-100 inline-block rounded-lg mb-3"
              >
                {{
                  `Closing in 
                ${countdownTimer(
                  isoToDateWithTimezone(classroomForm.closeDate)
                )}`
                }}
              </p>
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
            <div class="inline-flex items-start justify-start gap-3">
              <div>
                <i
                  class="pi pi-calendar p-3 text-xl rounded-xl border bg-slate-100 text-slate-500"
                />
                <div class="border-r border-slate-300 w-1/2 h-full" />
              </div>
              <div class="space-y-8">
                <div v-for="(date, index) in classroom.dates" :key="index">
                  <p>
                    {{
                      isoToDateWithTimezone(
                        date.date.startDateTime
                      ).toLocaleString("en-GB", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    }}
                  </p>
                  <p class="text-sm text-slate-500">
                    {{
                      isoToDateWithTimezone(
                        date.date.startDateTime
                      ).toLocaleString("en-GB", {
                        hour12: true,
                        hour: "numeric",
                        minute: "numeric",
                      })
                    }}
                    -
                    {{
                      isoToDateWithTimezone(
                        date.date.endDateTime
                      ).toLocaleString("en-GB", {
                        hour12: true,
                        hour: "numeric",
                        minute: "numeric",
                      })
                    }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <i
                class="pi pi-map-marker p-3 text-xl rounded-xl border bg-slate-100 text-slate-500"
              />
              <div>
                <div
                  v-if="
                    venues.length > 0 &&
                    classroom.venueStatus === EVenueRequestStatus.APPROVED
                  "
                >
                  <p>
                    {{ venues[0]?.room }},
                    {{ venues[0]?.location?.building }}
                    <span v-if="venues[0]?.location.floor">
                      fl. {{ venues[0]?.location.floor }}
                    </span>
                    <span v-if="venues.length > 1" class="font-light italic">
                      and {{ venues.length - 1 }} more
                    </span>
                  </p>
                </div>
                <p v-else>TBA</p>
              </div>
            </div>
          </div>
          <div class="mb-8 space-y-2">
            <p class="text-slate-500">What you will learn</p>
            <div v-html="classroom.details" />
          </div>
          <div class="space-y-2">
            <p class="text-slate-500">Made for</p>
            <div v-html="classroom.target" />
          </div>
          <div v-if="classroom.prerequisite" class="space-y-2">
            <p class="text-slate-500">Prerequisites</p>
            <div>{{ classroom?.prerequisite }}</div>
          </div>
          <div class="flex flex-col text-center gap-2">
            <Button
              v-if="classroom.owner === userProfile.id"
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
            <Button
              v-else-if="
                !classroom.registrationStatus ||
                seatsLeft <= 0 ||
                (classroomForm.openDate && !isFormOpen) ||
                (classroomForm.closeDate && isFormClosed)
              "
              :label="`Subscribe to &quot;${classroom.title}&quot; waitlist`"
              size="large"
              severity="secondary"
              rounded
              disabled
            />
            <div
              v-else-if="isUserRegistered"
              class="p-4 border rounded-xl bg-slate-50 flex flex-col gap-4"
            >
              <div class="flex justify-center items-center gap-2">
                <img
                  :src="userFormSubmission?.userDetail?.profilePicture"
                  :alt="`${userFormSubmission?.userDetail?.username} profile picture`"
                  class="w-8 h-8 rounded-full"
                />
                <p class="text-slate-500">Thank you for joining</p>
              </div>
              <Button
                label="View my submission"
                severity="secondary"
                @click="isSubmissionDialogVisible = true"
              />
            </div>
            <Button
              v-else-if="
                isoToDateWithTimezone(
                  classroom.dates[classroom.dates.length - 1].date.endDateTime
                ) < new Date()
              "
              size="large"
              :label="`Request for &quot;${classroom.title}&quot;`"
              rounded
              outlined
            />
            <Button
              v-else
              size="large"
              :label="`Join Now`"
              rounded
              :severity="'primary'"
              @click="isRegistrationDialogVisible = true"
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
        <div v-if="classroom?.classMaterials?.length > 0 && isUserCheckedIn">
          <p class="text-xl font-bold mb-4">Class Materials</p>
          <div class="bg-white p-6 border rounded-2xl flex flex-col gap-4">
            <div class="grid grid-cols-1 gap-2">
              <ClassMaterialItem
                v-for="(file, index) in classroom?.classMaterials"
                :key="index"
                :file="file"
                :index="index"
              />
            </div>
          </div>
        </div>
        <div>
          <p class="text-xl font-bold mb-4">Who Will Be Teaching Me?</p>
          <div class="bg-white p-6 border rounded-2xl flex flex-col gap-4">
            <div class="flex gap-4">
              <div
                class="w-24 h-24 aspect-square border rounded-full overflow-clip"
              >
                <Image preview>
                  <template #image>
                    <img
                      :src="classroom.instructorAvatar"
                      :alt="`${classroom.instructorName} profile image`"
                      class="w-24 h-24 aspect-square border rounded-full object-cover"
                    />
                  </template>
                  <template #original="slotProps">
                    <img
                      :src="classroom.instructorAvatar"
                      :alt="`${classroom.instructorName} profile image`"
                      :style="slotProps.style"
                      @click="slotProps.previewCallback"
                      class="w-[52rem] h-[52rem] aspect-square object-cover"
                    />
                  </template>
                </Image>
              </div>
              <div class="space-y-4">
                <div>
                  <p class="text-xl font-bold">
                    {{ classroom.instructorName }}
                  </p>
                  <p>{{ classroom.instructorBio }}</p>
                </div>
                <div>
                  <p class="text-slate-500">Familiarity to the topic</p>
                  <p>
                    {{ classroom.instructorFamiliarity || "" }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Dialog
    v-model:visible="isRegistrationDialogVisible"
    :header="`Registration for &quot;${classroom.title}&quot;`"
    :modal="true"
    dismissableMask
    :draggable="false"
    position="center"
    class="w-full max-w-screen-sm m-auto"
    :style="{
      'border-radius': '1.5rem',
    }"
  >
    <RegistrationForm @submitted="onFormSubmitted" />
  </Dialog>
  <Dialog
    v-model:visible="isSubmissionDialogVisible"
    :header="`Your submission for &quot;${classroom.title}&quot;`"
    :modal="true"
    dismissableMask
    :draggable="false"
    position="center"
    class="w-full max-w-screen-sm m-auto"
    :style="{
      'border-radius': '1.5rem',
    }"
  >
    <NuxtLayout
      name="form-submission"
      :userFormSubmission="userFormSubmission"
    />
  </Dialog>
</template>
