import {
  Address,
  ipfs,
  json,
  JSONValue,
  TypedMap,
} from "@graphprotocol/graph-ts";
import { User } from "../../generated/schema";

export function getOrCreateUser(user: Address): User {
  const userId = user.toHex();
  let userObj = User.load(userId);
  if (userObj == null) {
    userObj = new User(userId);
    userObj.save();
  }
  return userObj;
}

export function getOrCreateArray(
  arrayObj: Array<string> | null
): Array<string> {
  if (arrayObj == null) {
    return [];
  } else {
    return arrayObj;
  }
}

export function getIPFSHashFromURL(url: string): string {
  return url.replace("ipfs://", "");
}

export function getValueFromJSON(
  jsonObj: TypedMap<string, JSONValue> | null,
  key: string
): string | null {
  if (jsonObj == null) {
    return null;
  } else {
    let targetValue = jsonObj.get(key);
    if (targetValue == null) {
      return null;
    } else {
      return targetValue.toString();
    }
  }
}
