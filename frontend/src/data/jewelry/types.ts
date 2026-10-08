export type JewelryImage = {
    src: string;
    alt: string;
};

export type JewelryVariant = {
    id: string;
    metalLabel: string;
    caption: string;
    images: JewelryImage[];
};

export type JewelryPiece = {
    id: string;
    title: string;
    summary: string;
    variants: JewelryVariant[];
};

export type JewelrySection = {
    id: string;
    heading: string;
    pieces: JewelryPiece[];
};

export type JewelryPage = {
    slug: string;
    title: string;
    hero?: JewelryImage;
    heroCaption?: string;
    subtitle?: string;
    intro?: string[];
    stepsBeforeGallery?: string[];
    stepsAfterGallery?: string[];
    sections: JewelrySection[];
};
