import { LRLanguage, LanguageSupport } from '@codemirror/language';
import { styleTags, tags } from '@lezer/highlight';
import { LRParser } from '@lezer/lr';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = LRParser.deserialize({
  version: 14,
  states: "$nQYQPOOOkQPO'#C_OpQPO'#CbOxQPO'#CqOOQO'#Cc'#CcO!aQPO'#CbO!fQPO'#ChOOQO'#Cq'#CqOOQO'#Cl'#ClQYQPOOO!wQPO,58yO!|QPO,59OOOQO,58|,58|O#RQPO,59QOsQPO'#CdO#WQPO'#CfOOQO'#Ci'#CiO#]QPO,59SOOQO-E6j-E6jOOQO1G.e1G.eOOQO1G.j1G.jOOQO1G.l1G.lO!fQPO'#CmO#eQPO1G.nOOQO1G.n1G.nOOQO,59X,59XOOQO-E6k-E6kOOQO7+$Y7+$Y",
  stateData: "#{~OdOSPOS~OTVOXQOZROfPOiUO~OSYO~OT[OgZO~Og]OTeXXeXZeXbeXfeXieX~OT[O~OS`OX^OZ_O^`OiUO~OTcO~OXdO~OZeO~Og]O~O_fOhhO~O_fOhkO~O_SZX^PdgfihTd~",
  goto: "!efPPPgPPgksPsPy}PP!T!ZPPP!aTVOXSTOXT`UfXSOUXfSVOXQaURifQXORbXQgaRjgTWOX",
  nodeNames: "⚠ LineComment Program Command Identifier Note EventHeader Range TimeRange Time DateRange Date Filter UnitFilter Number Operator",
  maxTerm: 25,
  skippedNodes: [0,1],
  repeatNodeCount: 2,
  tokenData: "3W~RnOX#PXY#hYZ$_Z]#P]^#h^p#Ppq#hqr$prv#Pvw$pw}#P}!O%T!O!P#P!P!Q&]!Q!['a![!c#P!c!}+l!}#T#P#T#U,c#U#b+l#b#c/U#c#d1O#d#o+l#o#p1{#p#q$p#q#r2`#r#s2s#s;'S#P;'S;=`#b<%lO#P~#UST~OY#PZ;'S#P;'S;=`#b<%lO#P~#eP;=`<%l#P~#oYd~T~OX#PXY#hYZ$_Z]#P]^#h^p#Ppq#hq;'S#P;'S;=`#b<%lO#P~$dSd~XY$_YZ$_]^$_pq$_~$wS_~T~OY#PZ;'S#P;'S;=`#b<%lO#P~%YWT~OY#PZ}#P}!O%r!O!Q#P!Q![%T![;'S#P;'S;=`#b<%lO#P~%yUZ~T~OY#PZ!Q#P!Q![%r![;'S#P;'S;=`#b<%lO#P~&dUf~T~OY#PZ!P#P!P!Q&v!Q;'S#P;'S;=`#b<%lO#P~&}SP~T~OY&vZ;'S&v;'S;=`'Z<%lO&v~'^P;=`<%l&v~'ha^~T~OY#PZ}#P}!O%T!O!Q#P!Q!['a![!](m!]!c#P!c!d*X!d!r#P!r!s*X!s#T#P#T#U+T#U#d#P#d#e+T#e;'S#P;'S;=`#b<%lO#P~(rUT~OY#PZ!Q#P!Q![)U![;'S#P;'S;=`#b<%lO#P~)]^X~T~OY#PZ!Q#P!Q![)U![!c#P!c!d*X!d!r#P!r!s*X!s#T#P#T#U+T#U#d#P#d#e+T#e;'S#P;'S;=`#b<%lO#P~*^UT~OY#PZ!o#P!o!p*p!p;'S#P;'S;=`#b<%lO#P~*wSX~T~OY#PZ;'S#P;'S;=`#b<%lO#P~+YUT~OY#PZ#a#P#a#b*p#b;'S#P;'S;=`#b<%lO#P~+sYS~T~OY#PZ!Q#P!Q![+l![!c#P!c!}+l!}#T#P#T#o+l#o;'S#P;'S;=`#b<%lO#P~,j[S~T~OY#PZ!Q#P!Q![+l![!c#P!c!}+l!}#T#P#T#b+l#b#c-`#c#o+l#o;'S#P;'S;=`#b<%lO#P~-g[S~T~OY#PZ!Q#P!Q![+l![!c#P!c!}+l!}#T#P#T#W+l#W#X.]#X#o+l#o;'S#P;'S;=`#b<%lO#P~.fY_~S~T~OY#PZ!Q#P!Q![+l![!c#P!c!}+l!}#T#P#T#o+l#o;'S#P;'S;=`#b<%lO#P~/][S~T~OY#PZ!Q#P!Q![+l![!c#P!c!}+l!}#T#P#T#c+l#c#d0R#d#o+l#o;'S#P;'S;=`#b<%lO#P~0Y[S~T~OY#PZ!Q#P!Q![+l![!c#P!c!}+l!}#T#P#T#h+l#h#i.]#i#o+l#o;'S#P;'S;=`#b<%lO#P~1V[S~T~OY#PZ!Q#P!Q![+l![!c#P!c!}+l!}#T#P#T#f+l#f#g.]#g#o+l#o;'S#P;'S;=`#b<%lO#P~2SSi~T~OY#PZ;'S#P;'S;=`#b<%lO#P~2gSh~T~OY#PZ;'S#P;'S;=`#b<%lO#P~2zSg~T~OY#PZ;'S#P;'S;=`#b<%lO#P",
  tokenizers: [0],
  topRules: {"Program":[0,2]},
  tokenPrec: 121
});

const tbLang = LRLanguage.define({
    parser: parser.configure({
        props: [
            styleTags({
                LineComment: tags.lineComment,
                Operator: tags.number,
                Note: tags.content,
                Date: tags.constant(tags.tagName),
                Time: tags.constant(tags.tagName),
                Range: tags.constant(tags.tagName),
                Command: tags.function(tags.tagName),
                "{ }": tags.bracket,
                "~": tags.operatorKeyword
            }),
        ],
    }),
});
const timeblokLang = () => {
    return new LanguageSupport(tbLang);
};

export { tbLang, timeblokLang };
