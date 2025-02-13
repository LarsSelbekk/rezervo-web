export type FscResponse = {
    success: boolean;
    errors?: {
        [errorType: string]: string[];
    };
};

export type FscWeekScheduleResponse = FscResponse & {
    data: FscWeekSchedule;
};

export type FscWeekSchedule = FscClass[];

export type FscClass = {
    id: number;
    name: string;
    duration: {
        start: string;
        end: string;
    };
    groupActivityProduct: {
        id: number;
        name: string;
    };
    businessUnit: {
        id: number;
        name: string;
        location: string;
        companyNameForInvoice: string;
    };
    locations: {
        id: number;
        name: string;
    }[];
    instructors: {
        id: number;
        name: string;
        isSubstitute: boolean;
    }[];
    bookableEarliest: string;
    bookableLatest: string;
    externalMessage: string | null;
    internalMessage: string | null;
    cancelled: boolean;
    slots: {
        total: number;
        totalBookable: number;
        reservedForDropin: number;
        leftToBook: number;
        leftToBookIncDropin: number; // also known as leftToBookIncludingDropIn
        hasWaitingList: boolean;
        inWaitingList: number;
    };
};

export type FscActivityDetailResponse = FscResponse & {
    data: FscActivityDetail;
};

export type FscActivityDetail = {
    id: number;
    name: string;
    productLabels: {
        id: number;
        name: string;
    }[];
    businessUnits: {
        id: number;
        name: string;
        location: string;
        companyNameForInvoice: string;
    }[];
    description: string;
    assets?: {
        reference: string;
        type: string;
        contentType: string;
        contentUrl: string;
        imageWidth: number;
        imageHeight: number;
        focalPointX: number;
        focalPointY: number;
    }[];
    participantsMustPay: boolean;
};

export type DetailedFscWeekSchedule = DetailedFscClass[];
export type DetailedFscClass = FscClass & {
    description: string;
    image: string;
};
