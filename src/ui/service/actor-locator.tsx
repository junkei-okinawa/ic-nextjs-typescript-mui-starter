const canisterId = process.env.NEXT_PUBLIC_HELLO_CANISTER_ID as String;
const host = process.env.NEXT_PUBLIC_IC_HOST as String;

// importしたいbackendキャニスターがある場合は
// 以下のimportとexportのセットを記述して、componetやpage側でimportすれば利用可能になる
// 参考：src/ui/components/greetButton.tsx
import {
  createActor as createHelloActor
} from "../../declarations/hello"

export function makeHelloActor() {
  return makeActor(canisterId, createHelloActor)
}

export const makeActor = (canisterId: String, createActor: any) => {
  return createActor(canisterId, {
    agentOptions: {
      host: host
    }
  })
}
