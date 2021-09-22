/* eslint-disable no-undef */
import logger from '../src/index';

describe('logger', () => {
    const spyErr = jest.spyOn(console, 'error');
    const spyTrace = jest.spyOn(console, 'trace');
    const spyWarn = jest.spyOn(console, 'warn');
    const spyInfo = jest.spyOn(console, 'info');
    const spyDebug = jest.spyOn(console, 'debug');

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should level not defined ', () => {
        logger(' ').info('test');
        expect(spyInfo).not.toHaveBeenCalled();
    });
    it('should level not existe ', () => {
        logger('LOG').info('test');
        expect(spyInfo).not.toHaveBeenCalled();
    });
    it('should info', () => {
        logger('INFO').info('test')
        expect(spyInfo).toHaveBeenCalledWith('[ INFO ] : ', ['test']);
    });
    it('should debug', () => {
        logger('DEBUG').debug('test');
        expect(spyDebug).toHaveBeenCalledWith('[ DEBUG ] : ', ['test']);
    });
    it('should warn', () => {
        logger('WARN').warn('test');
        expect(spyWarn).toHaveBeenCalledWith('[ WARN ] : ', ['test']);
    });
    it('should error', () => {
        logger('ERROR').error('test');
        expect(spyErr).toHaveBeenCalledWith('[ ERROR ] : ', ['test']);
    });
    it('should trace', () => {
        logger('TRACE').trace('test');
        expect(spyTrace).toHaveBeenCalledWith('[ TRACE ] : ', ['test']);
    });
    it('should see upper level false ', () => {
        logger('INFO').info('test');
        logger('INFO').debug('test');
        logger('INFO').warn('test');
        logger('INFO').error('test');
        logger('INFO').trace('test');
        expect(spyInfo).toHaveBeenCalledWith('[ INFO ] : ', ['test']);
        expect(spyDebug).not.toHaveBeenCalled();
        expect(spyWarn).not.toHaveBeenCalled();
        expect(spyErr).not.toHaveBeenCalled();
        expect(spyTrace).not.toHaveBeenCalled();
    });
    it('should see upper level true ', () => {
        logger('INFO', true).info('test');
        logger('INFO', true).debug('test');
        logger('INFO', true).warn('test');
        logger('INFO', true).error('test');
        logger('INFO', true).trace('test');
        expect(spyInfo).toHaveBeenCalledWith('[ INFO ] : ', ['test']);
        expect(spyDebug).toHaveBeenCalledWith('[ DEBUG ] : ', ['test']);
        expect(spyWarn).toHaveBeenCalledWith('[ WARN ] : ', ['test']);
        expect(spyErr).toHaveBeenCalledWith('[ ERROR ] : ', ['test']);
        expect(spyTrace).toHaveBeenCalledWith('[ TRACE ] : ', ['test']);
    });
    it('should level defined see upper level false ', () => {
        logger('error').info('test');
        logger('error').debug('test');
        logger('error').warn('test');
        logger('error').error('test');
        logger('error').trace('test');
        expect(spyInfo).not.toHaveBeenCalled();
        expect(spyDebug).not.toHaveBeenCalled();
        expect(spyWarn).not.toHaveBeenCalled();
        expect(spyErr).toHaveBeenCalledWith('[ ERROR ] : ', ['test']);
        expect(spyTrace).not.toHaveBeenCalled();
    });
    it('should level defined see upper level true ', () => {
        logger('error', true).info('test');
        logger('error', true).debug('test');
        logger('error', true).warn('test');
        logger('error', true).error('test');
        logger('error', true).trace('test');
        expect(spyInfo).not.toHaveBeenCalled();
        expect(spyDebug).not.toHaveBeenCalled();
        expect(spyWarn).not.toHaveBeenCalled();
        expect(spyErr).toHaveBeenCalledWith('[ ERROR ] : ', ['test']);
        expect(spyTrace).toHaveBeenCalledWith('[ TRACE ] : ', ['test']);
    });
});
