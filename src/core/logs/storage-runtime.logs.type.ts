interface ISources {
  [key: string]: Array<string | number>;
}

interface ICategory {
  maxCount: number;
  sources: ISources;
}

interface IStorage {
  [key: string]: ICategory;
}

export type { IStorage, ICategory, ISources };

/*
enum ELOG_LEVEL_COLORS {
  ERROR = 'red blackBG',
  WARN = 'yellow blackBG',
  INFO = 'cyan blackBG',
  DEBUG = 'green blackBG',
  SILLY = 'cyan magentaBG',
}


winston.addColors(myCustomLevels.colors);

Additionally, you can also change background color and font style. For example,

baz: 'italic yellow',
foobar: 'bold red cyanBG'


Possible options are below.

Font styles: bold, dim, italic, underline, inverse, hidden, strikethrough.

Font foreground colors: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.

Background colors: blackBG, redBG, greenBG, yellowBG, blueBG magentaBG, cyanBG, whiteBG



*/
