<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { EVenueRequestStatus, type IClassroom } from "../../../types/Classroom";
import type { IForm, IFormSubmission } from "../../../types/Form";
import type { IUser } from "../../../types/User";
import type { IVenue } from "../../../types/Venue";

const router = useRouter();
const { id } = router.currentRoute.value.params;
const { getClassroomById } = useClassroom();
const { getUserFormSubmissions, getFormById, getUserInClassroom } =
  useClassroomForm();
const { getVenueByIds } = useVenue();
const { getUserById, getUserProfile } = useUser();
const isRegistrationDialogVisible = ref(false);
const isUserRegistered = ref(false);
const user = (await getUserProfile()).result;
const usersInClassroom = ref<Partial<IUser>[]>([]);
const classroomForm = ref<IForm>({} as IForm);
let classroom: IClassroom = {} as IClassroom;
let owner: IUser = {} as IUser;
let venues: IVenue[] = [];

try {
  classroom = (await getClassroomById(id.toString())).result;
  owner = (await getUserById(classroom.owner)).result;
  venues = (
    await getVenueByIds(
      classroom.dates
        .map((date) => date.venueId.map((id) => id.toString()))
        .flat()
    )
  ).result.filter((venue, index, self) => {
    return index === self.findIndex((t) => t.id === venue.id);
  });
  classroomForm.value = (await getFormById(classroom.id)).result;
  isUserRegistered.value = (
    await getUserFormSubmissions(user.id, id.toString())
  ).result
    ? true
    : false;
  usersInClassroom.value = (await getUserInClassroom(id.toString())).result;
} catch (error) {
  router.replace("/404");
}

const auth = useFirebaseAuth();

const signInWithGoogle = async () => {
  if (!auth) return;
  try {
    const res = await signInWithPopup(auth, new GoogleAuthProvider());
    const token = await res.user.getIdToken();
    await useAuth().login(token);
    router.push(`/class/${id}`);
  } catch (error) {
    console.error("Error signing in with Google:", error);
  }
};

useHead({
  title: `${classroom.title} · Classroom · ClassCraft`,
  meta: [
    {
      name: "description",
      content: `${classroom.title} class details.`,
    },
    {
      name: "keywords",
      content: `${classroom.title}, class, details`,
    },
  ],
});
</script>
<template>
  <div class="w-full flex flex-col">
    <div
      v-if="!user"
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
      class="flex flex-col gap-x-2 w-full mx-auto mb-3 lg:flex-row md:max-w-screen-lg"
    >
      <div class="mb-2 mx-auto md:w-1/2 lg:mt-0 lg:m-auto">
        <div
          v-if="classroom.coverImage"
          class="max-w-96 h-full m-auto aspect-square rounded-3xl overflow-clip md:max-w-full"
        >
          <Image :preview="classroom.coverImage ? true : false">
            <template #image>
              <img
                :src="classroom.coverImage"
                :alt="`${classroom.title} class cover image`"
                class="w-full bg-slate-200 aspect-square border rounded-3xl object-cover md:max-w-full"
              />
            </template>
            <template #original="slotProps">
              <img
                :src="classroom.coverImage"
                :alt="`${classroom.title} class cover image`"
                :style="slotProps.style"
                @click="slotProps.previewCallback"
                class="w-full h-full aspect-square object-cover md:w-[52rem] p-2"
              />
            </template>
          </Image>
        </div>
        <div
          v-else
          class="hidden w-full max-w-96 m-auto aspect-square bg-slate-200 border rounded-3xl lg:flex justify-center items-center md:max-w-full"
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
      </div>
      <div class="lg:w-1/2 space-y-8">
        <div class="bg-white px-6 py-8 border rounded-3xl flex flex-col gap-10">
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
                :value="classroom.capacity.toString()"
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
            <!-- <Button
              v-if="!classroom.registrationStatus"
              icon="pi pi-arrow-up"
              rounded
              outlined
              label="88"
            /> -->
            <Button
              v-if="classroom.owner === user.id"
              size="large"
              :label="`Edit &quot;${classroom.title}&quot;`"
              rounded
              severity="secondary"
              icon="pi pi-pencil"
              @click="router.push(`/class/${id}/edit`)"
              class="w-full font-medium"
            />
            <Button
              v-else-if="
                !classroom.registrationStatus ||
                (classroomForm.openDate &&
                  new Date() <=
                    isoToDateWithTimezone(classroomForm.openDate)) ||
                (classroomForm.closeDate &&
                  new Date() > isoToDateWithTimezone(classroomForm.closeDate))
              "
              :label="`Not open for registration`"
              size="large"
              severity="secondary"
              rounded
              disabled
            />
            <Button
              v-else
              size="large"
              rounded
              :disabled="isUserRegistered"
              :severity="isUserRegistered ? 'secondary' : 'primary'"
              @click="isRegistrationDialogVisible = true"
              class="w-full font-medium"
            >
              {{ isUserRegistered ? `Registered` : `Join  ${classroom.title}` }}
            </Button>

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
                <Avatar
                  v-if="usersInClassroom.length > 5"
                  :label="`+${usersInClassroom.length - 5}`"
                  shape="circle"
                />
              </AvatarGroup>
              <p class="text-slate-500">
                {{ usersInClassroom.length }} people joined this class
              </p>
            </div>
            <div
              v-else-if="
                classroom.registrationStatus && user.id !== classroom.owner
              "
            >
              <p class="text-slate-500">Be the first to join this class</p>
            </div>
          </div>
        </div>
        <div>
          <p class="text-xl font-bold mb-4">Who will be teaching me?</p>
          <div class="bg-white p-6 border rounded-3xl flex flex-col gap-4">
            <div class="space-y-5">
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
  </div>
  <Dialog
    v-model:visible="isRegistrationDialogVisible"
    :header="`Registration for ${classroom.title}`"
    :modal="true"
    :draggable="false"
    position="center"
    class="w-full max-w-screen-sm m-auto"
    :style="{
      'border-radius': '1.5rem',
    }"
  >
    <NuxtLayout name="registration-from" />
  </Dialog>
</template>
