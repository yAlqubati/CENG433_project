export interface serviceModel {
    _id: string,
    serviceName: string,
    briefDescription: string,
    detailedDescription: string,
    image?: File,
    lang: string,
    orderOfDisplay: number
}