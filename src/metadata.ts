import { EventBadgeMetadata, OrgMetadata } from "./../generated/schema";
import {
  Bytes,
  dataSource,
  json,
  JSONValue,
  log,
} from "@graphprotocol/graph-ts";

export function handleOrgMetadata(content: Bytes): void {
  log.debug("handleMetadata {}", [dataSource.address().toString()]);
  let orgMetadata = new OrgMetadata(dataSource.address().toString());
  const value = json.fromBytes(content).toObject();
  if (value) {
    const imageURL = value.get("imageURL");
    const websiteURL = value.get("websiteURL");
    const twitterId = value.get("twitterId");
    const discordServer = value.get("discordServer");
    const contactEmail = value.get("contactEmail");
    const industry = value.get("industry");

    if (
      imageURL &&
      websiteURL &&
      twitterId &&
      discordServer &&
      contactEmail &&
      industry
    ) {
      orgMetadata.image = imageURL.toString();
      orgMetadata.websiteURL = websiteURL.toString();
      orgMetadata.twitterId = twitterId.toString();
      orgMetadata.discordServer = discordServer.toString();
      orgMetadata.contactEmail = contactEmail.toString();
      orgMetadata.industry = industry.toString();
    }
    orgMetadata.save();
  }
}

export function handleEventBadgeMetadata(content: Bytes): void {
  log.debug("handleMetadata {}", [dataSource.address().toString()]);
  let eventBadgeMetadata = new EventBadgeMetadata(
    dataSource.address().toString()
  );
  const value = json.fromBytes(content).toObject();

  if (value) {
    const image = value.get("image");
    const attribs = value.get("attributes");

    if (image) {
      eventBadgeMetadata.image = image.toString();
    }

    if (attribs) {
      let newAttributes: Array<string> = [];
      let attributesArray = attribs.toArray();
      let currentValue: JSONValue;
      for (let i = 0; i < attributesArray.length; i++) {
        currentValue = attributesArray[i].toObject().mustGet("value");
        newAttributes.push(currentValue.toString());
      }
      eventBadgeMetadata.attributes = newAttributes;
    }

    eventBadgeMetadata.save();
  }
}
