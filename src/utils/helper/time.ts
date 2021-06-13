import {defineTime} from "../../defines/time";

interface Time {
    h: number,
    m: number,
    s: number,
}

class TimeHelper {
    private readonly time: Time;

    constructor(time: string) {
        if (!time.trim()) throw new SyntaxError();


        this.time = {
            h: 0,
            m: 0,
            s: 0
        }

        if (!!Number(time)) {
            let newTime: number = Number(time);


            this.time.h = Math.floor(Number(time) / (defineTime.HOURS));

            newTime -= this.time.h * defineTime.HOURS;

            this.time.m = Math.floor(newTime / defineTime.MINUTES);

            newTime -= this.time.m * defineTime.MINUTES;

            this.time.s = Math.floor(newTime / defineTime.SECONDS);

        } else {
            time = time.trim();
            const splitTime: string[] = time.split(' ');

            if (!Array.isArray(splitTime)) throw new SyntaxError();

            splitTime.forEach((item: string): void => {
                const split: string[] = item.split('');

                const unit: string | undefined = split.pop();

                if (!unit) throw new SyntaxError();

                if (!Object.keys(this.time).includes(unit)) {
                    return;
                }

                // @ts-ignore
                this.time[unit] = Number(split[0]);

            });

        }

    }

    toString(): string {
        const result: string[] = Object.keys(this.time).map((item: string): string => {
            // @ts-ignore
            if (this.time[item] === 0) return '';
            // @ts-ignore
            return `${this.time[item]}${item}`;
        })

        return result.join(' ').trim();

    }

    calculateTime(): number {
        return this.time.h * defineTime.HOURS + this.time.m * defineTime.MINUTES + this.time.s * defineTime.SECONDS;
    }

}

export default TimeHelper;