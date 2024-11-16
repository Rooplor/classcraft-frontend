export interface IContent {
    init?: IContent;
    id: number;
    title: string;
    content: string;
    activityGuides: { id: string; activityGuide: string }[];
    presentationGuides: { id: string; presentationGuide: string }[];
}
