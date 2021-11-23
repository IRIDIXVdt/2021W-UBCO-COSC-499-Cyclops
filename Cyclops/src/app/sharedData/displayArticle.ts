export class displayArticle {
    id: number;
    title: string;
    subtitle: string;
    image: string;
    segment: segmentItem[];
    cardIntroduction: string;
    columnName: number;
}

export class segmentItem{
    segmentTitle: string;
    segmentBody: string;
}