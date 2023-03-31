import {LRLanguage, LanguageSupport} from '@codemirror/language';
import {styleTags, tags as t} from '@lezer/highlight';
// typecheck ignore the below line

import {parser} from './timeblok.grammar';

export const tbLang = LRLanguage.define({
  parser: parser.configure({
    props: [
      styleTags({
        LineComment: t.lineComment,
        Operator: t.number,
        Note: t.content,
        Date: t.constant(t.tagName),
        Time: t.constant(t.tagName),
        Range: t.constant(t.tagName),
        Command: t.function(t.tagName),
        "{ }": t.bracket,
        "~": t.operatorKeyword
      }),
    ],
  }),
});

export const timeblokLang = () => {
  return new LanguageSupport(tbLang);
};