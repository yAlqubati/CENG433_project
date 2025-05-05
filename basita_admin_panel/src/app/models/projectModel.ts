export interface projectModel {
    _id: string,
    projectName: string,
    briefDescription: string,
    detailedDescription: string,
    image?: File,
    lang: string,
    orderOfDisplay: number
}