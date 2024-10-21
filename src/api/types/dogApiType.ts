export type TBreedAndSubBreed = {
  affenpinscher: [];
  african: [];
  airedale: [];
  akita: [];
  appenzeller: [];
  australian: ['kelpie', 'shepherd'];
  bakharwal: ['indian'];
  basenji: [];
  beagle: [];
  bluetick: [];
  borzoi: [];
  bouvier: [];
  boxer: [];
  brabancon: [];
  briard: [];
  buhund: ['norwegian'];
  bulldog: ['boston', 'english', 'french'];
  bullterrier: ['staffordshire'];
  cattledog: ['australian'];
  cavapoo: [];
  chihuahua: [];
  chippiparai: ['indian'];
  chow: [];
  clumber: [];
  cockapoo: [];
  collie: ['border'];
  coonhound: [];
  corgi: ['cardigan'];
  cotondetulear: [];
  dachshund: [];
  dalmatian: [];
  dane: ['great'];
  danish: ['swedish'];
  deerhound: ['scottish'];
  dhole: [];
  dingo: [];
  doberman: [];
  elkhound: ['norwegian'];
  entlebucher: [];
  eskimo: [];
  finnish: ['lapphund'];
  frise: ['bichon'];
  gaddi: ['indian'];
  germanshepherd: [];
  greyhound: ['indian', 'italian'];
  groenendael: [];
  havanese: [];
  hound: ['afghan', 'basset', 'blood', 'english', 'ibizan', 'plott', 'walker'];
  husky: [];
  keeshond: [];
  kelpie: [];
  kombai: [];
  komondor: [];
  kuvasz: [];
  labradoodle: [];
  labrador: [];
  leonberg: [];
  lhasa: [];
  malamute: [];
  malinois: [];
  maltese: [];
  mastiff: ['bull', 'english', 'indian', 'tibetan'];
  mexicanhairless: [];
  mix: [];
  mountain: ['bernese', 'swiss'];
  mudhol: ['indian'];
  newfoundland: [];
  otterhound: [];
  ovcharka: ['caucasian'];
  papillon: [];
  pariah: ['indian'];
  pekinese: [];
  pembroke: [];
  pinscher: ['miniature'];
  pitbull: [];
  pointer: ['german', 'germanlonghair'];
  pomeranian: [];
  poodle: ['medium', 'miniature', 'standard', 'toy'];
  pug: [];
  puggle: [];
  pyrenees: [];
  rajapalayam: ['indian'];
  redbone: [];
  retriever: ['chesapeake', 'curly', 'flatcoated', 'golden'];
  ridgeback: ['rhodesian'];
  rottweiler: [];
  saluki: [];
  samoyed: [];
  schipperke: [];
  schnauzer: ['giant', 'miniature'];
  segugio: ['italian'];
  setter: ['english', 'gordon', 'irish'];
  sharpei: [];
  sheepdog: ['english', 'indian', 'shetland'];
  shiba: [];
  shihtzu: [];
  spaniel: ['blenheim', 'brittany', 'cocker', 'irish', 'japanese', 'sussex', 'welsh'];
  spitz: ['indian', 'japanese'];
  springer: ['english'];
  stbernard: [];
  terrier: [
    'american',
    'australian',
    'bedlington',
    'border',
    'cairn',
    'dandie',
    'fox',
    'irish',
    'kerryblue',
    'lakeland',
    'norfolk',
    'norwich',
    'patterdale',
    'russell',
    'scottish',
    'sealyham',
    'silky',
    'tibetan',
    'toy',
    'welsh',
    'westhighland',
    'wheaten',
    'yorkshire',
  ];
  tervuren: [];
  vizsla: [];
  waterdog: ['spanish'];
  weimaraner: [];
  whippet: [];
  wolfhound: ['irish'];
};

export type TBreed = keyof TBreedAndSubBreed;
export type TSubBreedsOfBreed<T extends TBreed> = TBreedAndSubBreed[T];
export type TSubBreed<T extends TBreed> = TSubBreedsOfBreed<T>[number];

export interface IGetFilesResponseBody {
  _embedded: {
    items: {
      antivirus_tatus: string;
      comment_ids: {
        private_resource: string;
        public_resource: string;
      };
      created: string;
      exif: object;
      file: string;
      md5: string;
      media_type: string;
      mime_type: string;
      modified: string;
      name: string;
      path: string;
      preview: string;
      resource_id: string;
      revision: number;
      sha256: string;
      size: number;
      sizes: {
        name: string;
        url: string;
      }[];
      type: string;
    }[];
    comment_ids: {
      private_resource: string;
      public_resource: string;
    };
    created: string;
    exif: object;
    modified: string;
    name: string;
    path: string;
    resource_id: string;
    revision: number;
    type: string;
  };
}

export interface IGetBreedsResponseBody {
  message: TBreedAndSubBreed;
  status: string;
}

export interface IGetSubBreedsResponseBody<T extends TBreed> {
  message: TSubBreedsOfBreed<T>;
  status: string;
}

export interface IGetImageResponseBody {
  message: string[];
  status: string;
}
