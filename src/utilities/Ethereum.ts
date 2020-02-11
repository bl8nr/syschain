import { Logger as log } from '@utilities';

export class Ethereum {

    constructor() {
        this.init();
    }

    private init() {
        const progress = log.loaderLog(log.yellow(`Connecting to Ethereum`));

        setTimeout(() => {
            progress.succeed(log.green(`Succefully eastablished connection to Ethereum`))
        }, 3000);
    }

}