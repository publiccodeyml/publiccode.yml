const uk = [
  {
    type: "array",
    title: "platforms",
    label: "Platforms",
    description:
      "Values: web, windows, mac, linux, ios, android. Human readable values outside this list are allowed",
    examples: ["android", "ios"],
    items: {
      type: "string",
      enum: ["web", "windows", "mac", "linux", "ios", "android"]
    },
    section: 1
  },
  {
    title: "sample",
    label: "sample UK",
    type: "string",
    description:
      "This key contains the sample version of the country specific subschema.",
    section: 6,
    required: true,
    group: "uk"
  }
];
export default uk;
