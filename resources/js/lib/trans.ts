type TransFn = (key: string, replaces?: Record<string, string | number> | string) => string;
type TransChoiceFn = (key: string, count?: number, replaces?: Record<string, string | number> | string) => string;

/**
 * Build a named action label by combining an action key with an entity key.
 *
 * Example: transAction(trans, transChoice, 'add', 'category')
 *   → trans('actions.named.add', { name: transChoice('common.entity.category', 1) })
 *   → "Ajouter Catégorie" (fr) / "Add Category" (en)
 */
export function transAction(
    trans: TransFn,
    transChoice: TransChoiceFn,
    action: string,
    entity: string,
    count: number = 1,
): string {
    const entityLabel = transChoice(`common.entity.${entity}`, count);
    return trans(`actions.named.${action}`, { name: entityLabel });
}
