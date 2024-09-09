type RenditionType = 'AUDIO' | 'VIDEO' | 'SUBTITLES' | 'CLOSED-CAPTIONS';
declare class Rendition {
    type: RenditionType;
    uri?: string;
    groupId: string;
    language?: string;
    assocLanguage?: string;
    name: string;
    isDefault: boolean;
    autoselect: boolean;
    forced: boolean;
    instreamId?: string;
    characteristics?: string;
    channels?: string;
    pathwayId?: string;
    constructor({ type, // required
    uri, // required if type='SUBTITLES'
    groupId, // required
    language, assocLanguage, name, // required
    isDefault, autoselect, forced, instreamId, // required if type=CLOSED-CAPTIONS
    characteristics, channels, pathwayId }: Rendition);
}
declare class Variant {
    uri: string;
    isIFrameOnly?: boolean;
    bandwidth: number;
    averageBandwidth?: number;
    score: number;
    codecs?: string;
    resolution?: Resolution;
    frameRate?: number;
    hdcpLevel?: string;
    allowedCpc: AllowedCpc[];
    videoRange: 'SDR' | 'HLG' | 'PQ';
    stableVariantId: string;
    pathwayId: string;
    programId: any;
    audio: (Rendition & {
        type: 'AUDIO';
    })[];
    video: (Rendition & {
        type: 'VIDEO';
    })[];
    subtitles: (Rendition & {
        type: 'SUBTITLES';
    })[];
    closedCaptions: (Rendition & {
        type: 'CLOSED-CAPTIONS';
    })[];
    currentRenditions: {
        audio: number;
        video: number;
        subtitles: number;
        closedCaptions: number;
    };
    constructor({ uri, // required
    isIFrameOnly, bandwidth, // required
    averageBandwidth, score, codecs, // required?
    resolution, frameRate, hdcpLevel, allowedCpc, videoRange, stableVariantId, pathwayId, programId, audio, video, subtitles, closedCaptions, currentRenditions }: any);
}
declare class SessionData {
    id: string;
    value?: string;
    uri?: string;
    language?: string;
    constructor({ id, // required
    value, uri, language }: SessionData);
}
declare class Key {
    method: string;
    uri?: string;
    iv?: ArrayBuffer;
    format?: string;
    formatVersion?: string;
    constructor({ method, // required
    uri, // required unless method=NONE
    iv, format, formatVersion }: Key);
}
declare class ContentSteering {
    serverUri: string;
    pathwayId: string;
    constructor({ serverUri, pathwayId }: ContentSteering);
}
export type Byterange = {
    length: number;
    offset: number;
};
declare class MediaInitializationSection {
    hint: boolean;
    uri: string;
    mimeType?: string;
    byterange?: Byterange;
    constructor({ hint, uri, // required
    mimeType, byterange }: Partial<MediaInitializationSection> & {
        uri: string;
    });
}
declare class DateRange {
    id: string;
    classId?: string;
    start?: Date;
    end?: Date;
    duration?: number;
    plannedDuration?: number;
    endOnNext?: boolean;
    attributes: Record<string, any>;
    constructor({ id, // required
    classId, // required if endOnNext is true
    start, end, duration, plannedDuration, endOnNext, attributes }: DateRange);
}
declare class SpliceInfo {
    type: string;
    duration?: number;
    tagName?: string;
    value?: string;
    constructor({ type, // required
    duration, // required if the type is 'OUT'
    tagName, // required if the type is 'RAW'
    value }: SpliceInfo);
}
type DataType = 'part' | 'playlist' | 'prefetch' | 'segment';
declare class Data {
    type: DataType;
    constructor(type: DataType);
}
declare class Playlist extends Data {
    isMasterPlaylist: boolean;
    uri?: string;
    version?: number;
    independentSegments: boolean;
    start?: {
        offset: number;
        precise: boolean;
    };
    source?: string;
    constructor({ isMasterPlaylist, // required
    uri, version, independentSegments, start, source }: Partial<Playlist> & {
        isMasterPlaylist: boolean;
    });
}
declare class MasterPlaylist extends Playlist {
    variants: Variant[];
    currentVariant?: number;
    sessionDataList: SessionData[];
    sessionKeyList: Key[];
    contentSteering?: ContentSteering;
    constructor(params?: Partial<MasterPlaylist>);
}
type LowLatencyCompatibility = {
    canBlockReload: boolean;
    canSkipUntil: number;
    holdBack: number;
    partHoldBack: number;
};
declare class MediaPlaylist extends Playlist {
    targetDuration: number;
    mediaSequenceBase?: number;
    discontinuitySequenceBase?: number;
    endlist: boolean;
    playlistType?: 'EVENT' | 'VOD';
    isIFrame?: boolean;
    segments: Segment[];
    prefetchSegments: PrefetchSegment[];
    lowLatencyCompatibility?: LowLatencyCompatibility;
    partTargetDuration?: number;
    renditionReports: RenditionReport[];
    skip: number;
    hash?: Record<string, any>;
    constructor(params?: Partial<MediaPlaylist>);
}
declare class Segment extends Data {
    uri: string;
    mimeType: string;
    data: any;
    duration: number;
    title?: string;
    byterange: Byterange;
    discontinuity?: boolean;
    mediaSequenceNumber: number;
    discontinuitySequence: number;
    key?: Key;
    map: MediaInitializationSection;
    programDateTime?: Date;
    dateRange: DateRange;
    markers: SpliceInfo[];
    parts: PartialSegment[];
    gap?: boolean;
    constructor({ uri, mimeType, data, duration, title, byterange, discontinuity, mediaSequenceNumber, discontinuitySequence, key, map, programDateTime, dateRange, markers, parts, gap }: any);
}
declare class PartialSegment extends Data {
    hint: boolean;
    uri: string;
    duration?: number;
    independent?: boolean;
    byterange?: Byterange;
    gap?: boolean;
    constructor({ hint, uri, // required
    duration, independent, byterange, gap }: Omit<PartialSegment, 'type'>);
}
declare class PrefetchSegment extends Data {
    uri: string;
    discontinuity?: boolean;
    mediaSequenceNumber: number;
    discontinuitySequence: number;
    key?: Key | null;
    constructor({ uri, // required
    discontinuity, mediaSequenceNumber, discontinuitySequence, key }: Omit<PrefetchSegment, 'type'>);
}
declare class RenditionReport {
    uri: string;
    lastMSN?: number;
    lastPart: number;
    constructor({ uri, // required
    lastMSN, lastPart }: RenditionReport);
}
export { Rendition, Variant, SessionData, Key, MediaInitializationSection, DateRange, SpliceInfo, Playlist, MasterPlaylist, MediaPlaylist, Segment, PartialSegment, PrefetchSegment, RenditionReport, ContentSteering };
export type AllowedCpc = {
    format: string;
    cpcList: string[];
};
export type ExtInfo = {
    duration: number;
    title: string;
};
export type Resolution = {
    width: number;
    height: number;
};
export type TagParam = [null, null] | [number, null] | [null, Record<string, any>] | [ExtInfo, null] | [Byterange, null] | [Date, null];
export type UserAttribute = number | string | Uint8Array;
export type PostProcess = {
    segmentProcessor?: ((lines: string[], start: number, end: number, segment: Segment, i: number) => void);
    variantProcessor?: ((lines: string[], start: number, end: number, variant: Variant, i: number) => void);
};
