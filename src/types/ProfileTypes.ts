export interface IProfile {
    firstName: string,
    lastName: string,
    shortName: string,
    birthday: Date,
    gender: string,
}

export interface IFullProfile extends IProfile {
    id: number,
    userId: number,
    avatarPath: string,
    isFilled: boolean,
}