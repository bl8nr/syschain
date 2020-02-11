import { logger } from '@utilities';

export function TerminalLog(pendingMessage: string, successMessage?: string, failureMessage?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            const method = descriptor.value;
        
            descriptor.value = function (...args: any[]) {
                logger.changeStatus(successMessage ? pendingMessage : `${pendingMessage}...`);
        
                // invoke greet() and get its return value
                const result = method.apply(this, args);
        
                logger.logSuccess(successMessage ? successMessage : pendingMessage);
                // return the result of invoking the method
                return result;
            }
            return descriptor;
        };
};