import {
    Event,
    EventPropGetter,
    DayPropGetter,
    EventWrapperProps,
    Components
} from 'react-big-calendar';

/* Mui */
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import dayjs from 'dayjs';

import Calendar from '@/components/Calendar';
import Popover from '@/components/Popover';

import eventJson from '@/assets/mocks/calendar.json';

/**
 * 行事曆活動 API 的格式
 * @property {1 | 2 | 3 | 4 | null} CalendarEvent.type          - 活動類型
 * @property {string | null}        CalendarEvent.note          - 備註
 * @property {string | null}        CalendarEvent.description   - 活動描述
 */
export interface CalendarEvent extends Event {
    type?: number | null;
    note?: string | null;
    description?: string | null;
}

const events: CalendarEvent[] = eventJson.map((d) => ({
    ...d,
    title: `${d.title} ${d.description}`,
    allDay: d.end === null,
    start: new Date(d.start || 0),
    end: new Date(d.end || d.start || 0)
}));

const customEventPropGetter: EventPropGetter<CalendarEvent> = (event) => {
    if (event.allDay) {
        switch (event.type) {
            case 1:
            case 2:
                return { className: 'all-day-event' };
            default:
        }
    }
    return {};
};

const eventMap = events.reduce(
    (o, d) => (d.start ? o.set(dayjs(d.start).format('YYYY/MM/DD'), d) : o),
    new Map<string, CalendarEvent>()
);

const customDayPropGetter: DayPropGetter = (date) => {
    const e = eventMap.get(dayjs(date).format('YYYY/MM/DD'));

    if (e?.allDay) {
        switch (e.type) {
            case 1:
                return { className: 'holiday-color' };
            case 2:
                return { className: 'make-up-workday-color' };
            default:
        }
    }
    if (date.getDay() === 0 || date.getDay() === 6) {
        return { className: 'weekend-color' };
    }
    return {};
};

const eventWrapper: Components['eventWrapper'] = (props) => {
    const { event, children } = props as EventWrapperProps<CalendarEvent> & {
        children: JSX.Element;
    };

    const popoverContent = event.note
        ?.split('<br>')
        .map((text) => <Typography key={text}>{text}</Typography>);

    return event.note ? (
        <Popover
            mode="hover"
            trigger={children}
            anchorOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
            transformOrigin={{
                vertical: 'center',
                horizontal: 'center'
            }}
        >
            <Box sx={{ p: 1 }}>{popoverContent}</Box>
        </Popover>
    ) : (
        children
    );
};

function Home() {
    return (
        <Calendar
            events={events}
            eventPropGetter={customEventPropGetter}
            dayPropGetter={customDayPropGetter}
            components={{ eventWrapper }}
        />
    );
}

export default Home;
