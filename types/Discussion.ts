export interface Discussion {
    id: number;
    title: string;
    description: string;
    status: DiscussionStatus;
    createdAt: string;
    upvotes: number;
}

export enum DiscussionStatus {
    Pending = 0,
    Closed = 1,
}

export const mockDiscussions: Discussion[] = [
    {
        id: 1,
        title: "Discussion 1",
        description: "This is the first discussion",
        status: DiscussionStatus.Pending,
        createdAt: "2021-10-10",
        upvotes: 10,
    },
    {
        id: 2,
        title: "Discussion 2",
        description: "This is the second discussion",
        status: DiscussionStatus.Pending,
        createdAt: "2021-10-10",
        upvotes: 20,
    },
    {
        id: 3,
        title: "Discussion 3",
        description: "This is the third discussion",
        status: DiscussionStatus.Closed,
        createdAt: "2021-10-10",
        upvotes: 30,
    },
    {
        id: 4,
        title: "Discussion 4",
        description: "This is the fourth discussion",
        status: DiscussionStatus.Closed,
        createdAt: "2021-10-10",
        upvotes: 40,
    },
    {
        id: 5,
        title: "Discussion 5",
        description: "This is the fifth discussion",
        status: DiscussionStatus.Pending,
        createdAt: "2021-10-10",
        upvotes: 50,
    },
];
