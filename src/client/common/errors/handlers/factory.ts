// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { inject, injectable, named } from 'inversify';
import 'reflect-metadata';
import { OutputChannel } from 'vscode';
import { IServiceContainer } from '../../../ioc/types';
import { ILinterHelper } from '../../../linters/types';
import { STANDARD_OUTPUT_CHANNEL } from '../../constants';
import { IErrorHandler, IErrorHandlerFactory, IInstaller, ILogger, IOutputChannel, Product } from '../../types';
import { ErrorHandler } from './main';

@injectable()
export class ErrorHandlerFactory implements IErrorHandlerFactory {
    constructor( @inject(IInstaller) private installer: IInstaller,
        @inject(ILogger) private logger: ILogger,
        @inject(IOutputChannel) @named(STANDARD_OUTPUT_CHANNEL) private outputChannel: OutputChannel,
        @inject(ILinterHelper) private linterHelper: ILinterHelper,
        @inject(IServiceContainer) private serviceContainer: IServiceContainer) {

    }
    public create(product: Product): IErrorHandler {
        return new ErrorHandler(product, this.installer, this.linterHelper, this.logger, this.outputChannel, this.serviceContainer);
    }
}
