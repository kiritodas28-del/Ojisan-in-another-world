/**
 * router.ts
 * tRPC router — exposes server-side game logic to the React client.
 * Each procedure receives a player intent, dispatches it, and returns
 * the updated GameState + narrative lines.
 *
 * TODO (Task I.2): Set up tRPC server scaffold and wire procedures.
 *
 * All game state mutations happen server-side.
 * The client only sends intents and receives updated state.
 */

// import { initTRPC } from '@trpc/server';
// import { dispatch }  from '../engines/dispatcher';
// import type { PlayerIntent } from '../engines/dispatcher';
// import type { GameState }    from '../state/gameState';

// const t = initTRPC.create();

// export const appRouter = t.router({
//   sendIntent: t.procedure
//     .input((val: unknown) => val as { state: GameState; intent: PlayerIntent })
//     .mutation(({ input }) => dispatch(input.state, input.intent)),
// });

// export type AppRouter = typeof appRouter;

export {}; // placeholder until tRPC is installed
