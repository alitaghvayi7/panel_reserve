import 'server-only'

interface DictionaryLoader {
    [key: string]: () => Promise<any>;
}

const dictionaries: DictionaryLoader = {
    fa: () => import('../dictionaries/fa.json').then((module) => module.default),
}


export const getDictionary = async (locale?: string): Promise<any> => {
    return dictionaries[locale || 'fa']()
}
