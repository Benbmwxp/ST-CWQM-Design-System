/**
 * The approved icon set (Lucide, ISC licence), named by what each icon means
 * in the dashboards. Prefer these names in new code so the same idea always
 * uses the same icon. Icons are decorative: add aria-hidden, and give
 * icon-only buttons an aria-label.
 */
import {
  Activity, ArrowDown, ArrowRight, ArrowUp, ArrowUpDown, ArrowUpRight, BarChart3, Bell, CalendarDays, CalendarRange,
  ChevronDown, ChevronLeft, ChevronRight, CircleAlert, CircleCheck, Clock, Crosshair, Database, Download,
  EllipsisVertical, FileText, Filter, Flag, Gauge, Grid2x2, Grid3x3, House, Info, Lightbulb, List, MapPin, Network,
  ScanSearch, Search, Settings, Settings2, Share2, ShieldCheck, Target, TriangleAlert, Wrench, X,
  type LucideIcon,
} from 'lucide-react';

export const icons = {
  navigation: {
    overview: House, cwqm: Network, dataStreams: Activity, concernCodes: CircleAlert, operability: Gauge,
    compliance: ShieldCheck, equipment: Wrench, reports: FileText, alerts: Bell, settings: Settings,
  },
  actions: {
    share: Share2, export: Download, more: EllipsisVertical, filter: Filter, search: Search, clear: X,
    link: ArrowRight, expand: ArrowUpRight, sort: ArrowUpDown,
  },
  controls: { dropdown: ChevronDown, previous: ChevronLeft, next: ChevronRight, calendar: CalendarDays, dateRange: CalendarRange, time: Clock },
  flow: { upstream: ArrowUp, downstream: ArrowDown, trend: ArrowUpRight },
  status: { info: Info, warning: TriangleAlert, alert: CircleAlert, success: CircleCheck, flag: Flag, insight: Lightbulb },
  data: {
    chart: BarChart3, stream: Activity, heatmap: Grid3x3, table: Grid2x2, list: List, database: Database, document: FileText,
    site: MapPin, target: Crosshair, focus: ScanSearch, correlation: Target, quality: ShieldCheck, operability: Settings2,
  },
} satisfies Record<string, Record<string, LucideIcon>>;

export type IconGroup = keyof typeof icons;
