import {END_TAG, START_TAG} from './constants';

type TransformType = (filePath: string, file: File, index: number, length: number) => string;

interface IInjector {
    //noinspection SpellCheckingInspection
    starttag: string;
    //noinspection SpellCheckingInspection
    endtag: string;
    name: string;
    transform: TransformType;
}

export function createInjector(name: string, transform: TransformType): IInjector {
    //noinspection SpellCheckingInspection
    return {
        endtag: END_TAG,
        name,
        starttag: START_TAG,
        transform
    };
}
