import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  AdminChanged,
  BeaconUpgraded,
  createOrgProfileEvent,
  updateOrgProfileEvent,
  Upgraded
} from "../generated/Organisation/Organisation"

export function createAdminChangedEvent(
  previousAdmin: Address,
  newAdmin: Address
): AdminChanged {
  let adminChangedEvent = changetype<AdminChanged>(newMockEvent())

  adminChangedEvent.parameters = new Array()

  adminChangedEvent.parameters.push(
    new ethereum.EventParam(
      "previousAdmin",
      ethereum.Value.fromAddress(previousAdmin)
    )
  )
  adminChangedEvent.parameters.push(
    new ethereum.EventParam("newAdmin", ethereum.Value.fromAddress(newAdmin))
  )

  return adminChangedEvent
}

export function createBeaconUpgradedEvent(beacon: Address): BeaconUpgraded {
  let beaconUpgradedEvent = changetype<BeaconUpgraded>(newMockEvent())

  beaconUpgradedEvent.parameters = new Array()

  beaconUpgradedEvent.parameters.push(
    new ethereum.EventParam("beacon", ethereum.Value.fromAddress(beacon))
  )

  return beaconUpgradedEvent
}

export function createUpgradedEvent(implementation: Address): Upgraded {
  let upgradedEvent = changetype<Upgraded>(newMockEvent())

  upgradedEvent.parameters = new Array()

  upgradedEvent.parameters.push(
    new ethereum.EventParam(
      "implementation",
      ethereum.Value.fromAddress(implementation)
    )
  )

  return upgradedEvent
}

export function createCreateOrgProfileEvent(
  id: i32, 
  name: string, 
  description: string, 
  uri: string)
: createOrgProfileEvent{
  let event = changetype<createOrgProfileEvent>(newMockEvent());
  event.parameters = new Array();

  let idParam = new ethereum.EventParam("id", ethereum.Value.fromI32(id))

  let eventBadgeArray: Address[] = new Array()

  let orgInfoArray: Array<ethereum.Value> = [
    ethereum.Value.fromString(name),
    ethereum.Value.fromString(description),
    ethereum.Value.fromString(uri),
    ethereum.Value.fromAddressArray(eventBadgeArray),
  ]
  let orgInfo = changetype<ethereum.Tuple>(orgInfoArray);

  let orgParam = new ethereum.EventParam("orgInfo", ethereum.Value.fromTuple(orgInfo))

  event.parameters.push(idParam)
  event.parameters.push(orgParam)

  return event
}

export function createUpdateOrgProfileEvent(
  id: i32,
  operatorAddress: Address, 
  name: string, 
  description: string, 
  uri: string)
: updateOrgProfileEvent{
  let event = changetype<updateOrgProfileEvent>(newMockEvent());
  event.parameters = new Array();

  let idParam = new ethereum.EventParam("id", ethereum.Value.fromI32(id))
  let operatorParam = new ethereum.EventParam("operatorAddress", ethereum.Value.fromAddress(operatorAddress))

  let eventBadgeArray: Address[] = new Array()

  let orgInfoArray: Array<ethereum.Value> = [
    ethereum.Value.fromString(name),
    ethereum.Value.fromString(description),
    ethereum.Value.fromString(uri),
    ethereum.Value.fromAddressArray(eventBadgeArray),
  ]
  let orgInfo = changetype<ethereum.Tuple>(orgInfoArray);

  let orgParam = new ethereum.EventParam("orgInfo", ethereum.Value.fromTuple(orgInfo))

  event.parameters.push(idParam)
  event.parameters.push(operatorParam)
  event.parameters.push(orgParam)

  return event
}