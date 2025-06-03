import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import groovy from "react-syntax-highlighter/dist/esm/languages/prism/groovy";
import json from "react-syntax-highlighter/dist/esm/languages/prism/json";
import kotlin from "react-syntax-highlighter/dist/esm/languages/prism/kotlin";
import "react-syntax-highlighter/dist/esm/styles/prism/prism";

SyntaxHighlighter.registerLanguage("groovy", groovy);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("kts", kotlin);
