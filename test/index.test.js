/* eslint-disable no-undef */

import { logger } from '../src/index';

describe('logger', () => {
    const spyTrace = jest.spyOn(console, 'trace');
    const spyInfo = jest.spyOn(console, 'info');
    const spyDebug = jest.spyOn(console, 'debug');
    const spyWarn = jest.spyOn(console, 'warn');
    const spyErr = jest.spyOn(console, 'error');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should level not defined ', () => {
        logger.setup(' ')
        logger.info('test');
        expect(spyInfo).not.toHaveBeenCalled();
    });
    it('should level not existe ', () => {
        logger.setup('LOG')
        logger.info('test');
        expect(spyInfo).not.toHaveBeenCalled();
    });
    it('should info', () => {
        logger.setup('INFO')
        logger.info('test')
        expect(spyInfo).toHaveBeenCalled();
    });
    it('should debug', () => {
        logger.setup('DEBUG')
        logger.debug('test');
        expect(spyDebug).toHaveBeenCalled();
    });
    it('should warn', () => {
        logger.setup('WARN')
        logger.warn('test');
        expect(spyWarn).toHaveBeenCalled();
    });
    it('should error', () => {
        logger.setup('ERROR')
        logger.error('test');
        expect(spyErr).toHaveBeenCalled();
    });
    it('should trace', () => {
        logger.setup('TRACE')
        logger.trace('test');
        expect(spyTrace).toHaveBeenCalled();
    });
    it('should see upper level false ', () => {
        logger.setup('INFO')
        logger.info('test');
        logger.debug('test');
        logger.warn('test');
        logger.error('test');
        logger.trace('test');
        expect(spyTrace).not.toHaveBeenCalled();
        expect(spyInfo).toHaveBeenCalled();
        expect(spyDebug).not.toHaveBeenCalled();
        expect(spyWarn).not.toHaveBeenCalled();
        expect(spyErr).not.toHaveBeenCalled();
    });
    it('should see upper level true ', () => {
        logger.setup('INFO', true)
        logger.info('test');
        logger.debug('test');
        logger.warn('test');
        logger.error('test');
        logger.trace('test');
        expect(spyTrace).not.toHaveBeenCalled();
        expect(spyInfo).toHaveBeenCalled();
        expect(spyDebug).toHaveBeenCalled();
        expect(spyWarn).toHaveBeenCalled();
        expect(spyErr).toHaveBeenCalled();
    });
    it('should level defined see upper level false ', () => {
        logger.setup('ERROR')
        logger.info('test');
        logger.debug('test');
        logger.warn('test');
        logger.error('test');
        logger.trace('test');
        expect(spyTrace).not.toHaveBeenCalled();
        expect(spyInfo).not.toHaveBeenCalled();
        expect(spyDebug).not.toHaveBeenCalled();
        expect(spyWarn).not.toHaveBeenCalled();
        expect(spyErr).toHaveBeenCalled();
    });
    it('should level defined see upper level true ', () => {
        logger.setup('ERROR', true)
        logger.info('test');
        logger.debug('test');
        logger.warn('test');
        logger.error('test');
        logger.trace('test');
        expect(spyTrace).not.toHaveBeenCalled();
        expect(spyInfo).not.toHaveBeenCalled();
        expect(spyDebug).not.toHaveBeenCalled();
        expect(spyWarn).not.toHaveBeenCalled();
        expect(spyErr).toHaveBeenCalled();
    });
});
