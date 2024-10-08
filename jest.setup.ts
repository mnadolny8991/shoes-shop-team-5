import { TextEncoder, TextDecoder } from 'util';
import 'cross-fetch/polyfill';

global.TextEncoder = TextEncoder;
// @ts-expect-error
global.TextDecoder = TextDecoder;

globalThis.Request = Request;