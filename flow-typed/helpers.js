// @flow

/**
 * Use this helper to extract flow type, that js function returtns
 * Very powerful for reducer actions
 *
 * Example
 * type myAction = ExtractReturn<typeof myActionFunction>
 */
declare type ExtractReturn<Fn> = $Call<<T>((...Iterable<any>) => T) => T, Fn>;
// declare type ExtractReturn<F> = $PropertyType<$ObjMap<{ x: F }, <R>(f: () => R) => R>, 'x'>
