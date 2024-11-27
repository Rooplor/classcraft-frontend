import { defineStore } from "pinia";

export enum ClassroomFeedDisplay {
    VOTING = 1,
    FOLLOWING = 2,
    EXPLORE = 3,
}

export enum DiscussionFeedDisplay {
    TRENDING = 1,
    FOR_YOU = 2,
    EXPLORE = 3,
}

export const useFeedDisplayStore = defineStore("feedDisplay", {
    state: () => ({
        classroomFeedDisplay: ClassroomFeedDisplay.EXPLORE,
        discussionFeedDisplay: DiscussionFeedDisplay.TRENDING,
    }),
    actions: {
        setClassroomFeedDisplay(classroomFeedDisplay: ClassroomFeedDisplay) {
            this.classroomFeedDisplay = classroomFeedDisplay;
        },
        setDiscussionFeedDisplay(discussionFeedDisplay: DiscussionFeedDisplay) {
            this.discussionFeedDisplay = discussionFeedDisplay;
        },
    },
});
