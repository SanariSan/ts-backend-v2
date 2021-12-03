import type { IWidgetAlt, IWidgetMain } from '../../widgets';

type TWidgetInstance = IWidgetMain | IWidgetAlt; // | etc
type TWidgetNames = 'main' | 'alt'; // | etc

export type { TWidgetInstance, TWidgetNames };
