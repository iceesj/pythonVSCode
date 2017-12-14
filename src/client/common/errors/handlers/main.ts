// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { OutputChannel, Uri } from 'vscode';
import { ExecutionInfo, IErrorHandler, IInstaller, ILogger, Product } from '../../../common/types';
import { IServiceContainer } from '../../../ioc/types';
import { ILinterHelper } from '../../../linters/types';
import { BaseErrorHandler } from './baseErrorHandler';
import { ModuleNotInstalledErrorHandler } from './notInstalled';
import { StandardErrorHandler } from './standard';

export class ErrorHandler implements IErrorHandler {
    private handler: BaseErrorHandler;
    constructor(product: Product, installer: IInstaller,
        helper: ILinterHelper, logger: ILogger,
        outputChannel: OutputChannel, serviceContainer: IServiceContainer) {
        // Create chain of handlers.
        const standardErrorHandler = new StandardErrorHandler(product, installer, helper, logger, outputChannel, serviceContainer);
        this.handler = new ModuleNotInstalledErrorHandler(product, installer, helper, logger, outputChannel, serviceContainer);
        this.handler.setNextHandler(standardErrorHandler);
    }

    public handleError(error: Error, resource: Uri, execInfo: ExecutionInfo): Promise<boolean> {
        return this.handler.handleError(error, resource, execInfo);
    }
}
