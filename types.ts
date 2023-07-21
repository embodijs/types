import type { SvelteComponent } from "svelte";

export declare type JsonMap = {
	[key: string]: AnyJson | undefined | unknown;
};

export declare type JsonArray = Array<AnyJson>;

export type AnyJson = string | boolean | number | JsonMap | JsonArray;

export type imagePath = `${string}.png` | `${string}.jpg` | `${string}.webp` | `${string}.gif` | `${string}.svg`;
export type jsonFile = `${string}.json`;

export interface PageFile extends JsonMap {
	type: 'Page',
	title: string,
	slug: string,
	lang: string,
	description?: string,
	author?: string,
	content: ElementData[];
}

export interface ComponentFile extends JsonMap {
	type: 'Component',
	name: string,
	description?: string,
	author?: string,
	content: ElementData;
}

export interface ElementData extends JsonMap{
	type: string;
	id?: string;
	template?: string;
	[x: string]: unknown;
}

export interface RenderHelper {
	compute (data: ElementData) : Promise<ElementData>
	compute (data: ElementData[]) : Promise<ElementData[]>
	load(path: imagePath): Promise<Buffer>
	load<T extends JsonMap = JsonMap>(path: jsonFile): Promise<T>
	load(path: string): Promise<unknown>
	createEngine(path: string): RenderHelper
	fetch (...args: Parameters<typeof fetch>): ReturnType<typeof fetch>
	storeAsset (content: Buffer, name: string, fileType: string): Promise<string>
}

export interface beforeBuildFunc <T extends ElementData = ElementData, U extends ElementData = ElementData> {
	(data: T, helper: RenderHelper): Promise<U>,
}

export interface EmbodiElement {
	identifier: string;
  	Component: typeof SvelteComponent;
	beforeBuild?: beforeBuildFunc
}

export interface EmbodiComponent {
	Component: typeof SvelteComponent;
}

export interface EmbodiBuildFunction {
	beforeBuild?: beforeBuildFunc
}

