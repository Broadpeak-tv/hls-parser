"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentSteering = exports.RenditionReport = exports.PrefetchSegment = exports.PartialSegment = exports.Segment = exports.MediaPlaylist = exports.MasterPlaylist = exports.Playlist = exports.SpliceInfo = exports.DateRange = exports.MediaInitializationSection = exports.Key = exports.SessionData = exports.Variant = exports.Rendition = void 0;
const utils = __importStar(require("./utils"));
class Rendition {
    type;
    uri;
    groupId;
    language;
    assocLanguage;
    name;
    isDefault;
    autoselect;
    forced;
    instreamId;
    characteristics;
    channels;
    pathwayId;
    constructor({ type, // required
    uri, // required if type='SUBTITLES'
    groupId, // required
    language, assocLanguage, name, // required
    isDefault, autoselect, forced, instreamId, // required if type=CLOSED-CAPTIONS
    characteristics, channels, pathwayId }) {
        utils.PARAMCHECK(type, groupId, name);
        utils.CONDITIONALASSERT([type === 'SUBTITLES', uri], [type === 'CLOSED-CAPTIONS', instreamId], [type === 'CLOSED-CAPTIONS', !uri], [forced, type === 'SUBTITLES']);
        this.type = type;
        this.uri = uri;
        this.groupId = groupId;
        this.language = language;
        this.assocLanguage = assocLanguage;
        this.name = name;
        this.isDefault = isDefault;
        this.autoselect = autoselect;
        this.forced = forced;
        this.instreamId = instreamId;
        this.characteristics = characteristics;
        this.channels = channels;
        this.pathwayId = pathwayId;
    }
}
exports.Rendition = Rendition;
class Variant {
    uri;
    isIFrameOnly;
    bandwidth;
    averageBandwidth;
    score;
    codecs;
    resolution;
    frameRate;
    hdcpLevel;
    allowedCpc;
    videoRange;
    stableVariantId;
    pathwayId;
    programId;
    audio;
    video;
    subtitles;
    closedCaptions;
    currentRenditions;
    constructor({ uri, // required
    isIFrameOnly = false, bandwidth, // required
    averageBandwidth, score, codecs, // required?
    resolution, frameRate, hdcpLevel, allowedCpc, videoRange, stableVariantId, pathwayId, programId, audio = [], video = [], subtitles = [], closedCaptions = [], currentRenditions = { audio: 0, video: 0, subtitles: 0, closedCaptions: 0 } }) {
        // utils.PARAMCHECK(uri, bandwidth, codecs);
        utils.PARAMCHECK(uri, bandwidth); // the spec states that CODECS is required but not true in the real world
        this.uri = uri;
        this.isIFrameOnly = isIFrameOnly;
        this.bandwidth = bandwidth;
        this.averageBandwidth = averageBandwidth;
        this.score = score;
        this.codecs = codecs;
        this.resolution = resolution;
        this.frameRate = frameRate;
        this.hdcpLevel = hdcpLevel;
        this.allowedCpc = allowedCpc;
        this.videoRange = videoRange;
        this.stableVariantId = stableVariantId;
        this.pathwayId = pathwayId;
        this.programId = programId;
        this.audio = audio;
        this.video = video;
        this.subtitles = subtitles;
        this.closedCaptions = closedCaptions;
        this.currentRenditions = currentRenditions;
    }
}
exports.Variant = Variant;
class SessionData {
    id;
    value;
    uri;
    language;
    constructor({ id, // required
    value, uri, language }) {
        utils.PARAMCHECK(id, value || uri);
        utils.ASSERT('SessionData cannot have both value and uri, shoud be either.', !(value && uri));
        this.id = id;
        this.value = value;
        this.uri = uri;
        this.language = language;
    }
}
exports.SessionData = SessionData;
class Key {
    method;
    uri;
    iv;
    format;
    formatVersion;
    constructor({ method, // required
    uri, // required unless method=NONE
    iv, format, formatVersion }) {
        utils.PARAMCHECK(method);
        utils.CONDITIONALPARAMCHECK([method !== 'NONE', uri]);
        utils.CONDITIONALASSERT([method === 'NONE', !(uri || iv || format || formatVersion)]);
        this.method = method;
        this.uri = uri;
        this.iv = iv;
        this.format = format;
        this.formatVersion = formatVersion;
    }
}
exports.Key = Key;
class ContentSteering {
    serverUri;
    pathwayId;
    constructor({ serverUri, pathwayId }) {
        this.serverUri = serverUri;
        this.pathwayId = pathwayId;
    }
}
exports.ContentSteering = ContentSteering;
class MediaInitializationSection {
    hint;
    uri;
    mimeType;
    byterange;
    constructor({ hint = false, uri, // required
    mimeType, byterange }) {
        utils.PARAMCHECK(uri);
        this.hint = hint;
        this.uri = uri;
        this.mimeType = mimeType;
        this.byterange = byterange;
    }
}
exports.MediaInitializationSection = MediaInitializationSection;
class DateRange {
    id;
    classId;
    start;
    end;
    duration;
    plannedDuration;
    endOnNext;
    attributes;
    constructor({ id, // required
    classId, // required if endOnNext is true
    start, end, duration, plannedDuration, endOnNext, attributes = {} }) {
        utils.PARAMCHECK(id);
        utils.CONDITIONALPARAMCHECK([endOnNext === true, classId]);
        utils.CONDITIONALASSERT([end, start], [end, start <= end], [duration, duration >= 0], [plannedDuration, plannedDuration >= 0]);
        this.id = id;
        this.classId = classId;
        this.start = start;
        this.end = end;
        this.duration = duration;
        this.plannedDuration = plannedDuration;
        this.endOnNext = endOnNext;
        this.attributes = attributes;
    }
}
exports.DateRange = DateRange;
class SpliceInfo {
    type;
    duration;
    tagName;
    value;
    constructor({ type, // required
    duration, // required if the type is 'OUT'
    tagName, // required if the type is 'RAW'
    value }) {
        utils.PARAMCHECK(type);
        utils.CONDITIONALPARAMCHECK([type === 'OUT', duration]);
        utils.CONDITIONALPARAMCHECK([type === 'RAW', tagName]);
        this.type = type;
        this.duration = duration;
        this.tagName = tagName;
        this.value = value;
    }
}
exports.SpliceInfo = SpliceInfo;
class Data {
    type;
    constructor(type) {
        utils.PARAMCHECK(type);
        this.type = type;
    }
}
class Playlist extends Data {
    isMasterPlaylist;
    uri;
    version;
    independentSegments;
    start;
    source;
    constructor({ isMasterPlaylist, // required
    uri, version, independentSegments = false, start, source }) {
        super('playlist');
        utils.PARAMCHECK(isMasterPlaylist);
        this.isMasterPlaylist = isMasterPlaylist;
        this.uri = uri;
        this.version = version;
        this.independentSegments = independentSegments;
        this.start = start;
        this.source = source;
    }
}
exports.Playlist = Playlist;
class MasterPlaylist extends Playlist {
    variants;
    currentVariant;
    sessionDataList;
    sessionKeyList;
    contentSteering;
    constructor(params = {}) {
        super({ ...params, isMasterPlaylist: true });
        const { variants = [], currentVariant, sessionDataList = [], sessionKeyList = [], contentSteering = undefined } = params;
        this.variants = variants;
        this.currentVariant = currentVariant;
        this.sessionDataList = sessionDataList;
        this.sessionKeyList = sessionKeyList;
        this.contentSteering = contentSteering;
    }
}
exports.MasterPlaylist = MasterPlaylist;
class MediaPlaylist extends Playlist {
    targetDuration;
    mediaSequenceBase;
    discontinuitySequenceBase;
    endlist;
    playlistType;
    isIFrame;
    segments;
    prefetchSegments;
    lowLatencyCompatibility;
    partTargetDuration;
    renditionReports;
    skip;
    hash;
    constructor(params = {}) {
        super({ ...params, isMasterPlaylist: false });
        const { targetDuration, mediaSequenceBase = 0, discontinuitySequenceBase = 0, endlist = false, playlistType, isIFrame, segments = [], prefetchSegments = [], lowLatencyCompatibility, partTargetDuration, renditionReports = [], skip = 0, hash } = params;
        this.targetDuration = targetDuration;
        this.mediaSequenceBase = mediaSequenceBase;
        this.discontinuitySequenceBase = discontinuitySequenceBase;
        this.endlist = endlist;
        this.playlistType = playlistType;
        this.isIFrame = isIFrame;
        this.segments = segments;
        this.prefetchSegments = prefetchSegments;
        this.lowLatencyCompatibility = lowLatencyCompatibility;
        this.partTargetDuration = partTargetDuration;
        this.renditionReports = renditionReports;
        this.skip = skip;
        this.hash = hash;
    }
}
exports.MediaPlaylist = MediaPlaylist;
class Segment extends Data {
    uri;
    mimeType;
    data;
    duration;
    title;
    byterange;
    discontinuity;
    mediaSequenceNumber;
    discontinuitySequence;
    key;
    map;
    programDateTime;
    dateRange;
    markers;
    parts;
    gap;
    constructor({ uri, mimeType, data, duration, title, byterange, discontinuity, mediaSequenceNumber = 0, discontinuitySequence = 0, key, map, programDateTime, dateRange, markers = [], parts = [], gap }) {
        super('segment');
        // utils.PARAMCHECK(uri, mediaSequenceNumber, discontinuitySequence);
        this.uri = uri;
        this.mimeType = mimeType;
        this.data = data;
        this.duration = duration;
        this.title = title;
        this.byterange = byterange;
        this.discontinuity = discontinuity;
        this.mediaSequenceNumber = mediaSequenceNumber;
        this.discontinuitySequence = discontinuitySequence;
        this.key = key;
        this.map = map;
        this.programDateTime = programDateTime;
        this.dateRange = dateRange;
        this.markers = markers;
        this.parts = parts;
        this.gap = gap;
    }
}
exports.Segment = Segment;
class PartialSegment extends Data {
    hint;
    uri;
    duration;
    independent;
    byterange;
    gap;
    constructor({ hint = false, uri, // required
    duration, independent, byterange, gap }) {
        super('part');
        utils.PARAMCHECK(uri);
        this.hint = hint;
        this.uri = uri;
        this.duration = duration;
        this.independent = independent;
        this.duration = duration;
        this.byterange = byterange;
        this.gap = gap;
    }
}
exports.PartialSegment = PartialSegment;
class PrefetchSegment extends Data {
    uri;
    discontinuity;
    mediaSequenceNumber;
    discontinuitySequence;
    key;
    constructor({ uri, // required
    discontinuity, mediaSequenceNumber = 0, discontinuitySequence = 0, key }) {
        super('prefetch');
        utils.PARAMCHECK(uri);
        this.uri = uri;
        this.discontinuity = discontinuity;
        this.mediaSequenceNumber = mediaSequenceNumber;
        this.discontinuitySequence = discontinuitySequence;
        this.key = key;
    }
}
exports.PrefetchSegment = PrefetchSegment;
class RenditionReport {
    uri;
    lastMSN;
    lastPart;
    constructor({ uri, // required
    lastMSN, lastPart }) {
        utils.PARAMCHECK(uri);
        this.uri = uri;
        this.lastMSN = lastMSN;
        this.lastPart = lastPart;
    }
}
exports.RenditionReport = RenditionReport;
