import { EvaluateInstanceTree, promiseTree } from "@rbxts/validate-tree";

export const CharacterRigR6 = {
	$className: "Model",

	Head: {
		$className: "Part",
		FaceCenterAttachment: "Attachment",
		FaceFrontAttachment: "Attachment",
		HairAttachment: "Attachment",
		HatAttachment: "Attachment",
	},

	HumanoidRootPart: {
		$className: "BasePart",
		RootAttachment: "Attachment",
		RootJoint: "Motor6D",
	},

	Humanoid: {
		$className: "Humanoid",
		Animator: "Animator",
		HumanoidDescription: "HumanoidDescription",
	},

	["Left Arm"]: {
		$className: "BasePart",
		LeftGripAttachment: "Attachment",
		LeftShoulderAttachment: "Attachment",
	},

	["Left Leg"]: {
		$className: "BasePart",
		LeftFootAttachment: "Attachment",
	},

	["Right Arm"]: {
		$className: "BasePart",
		RightGripAttachment: "Attachment",
		RightShoulderAttachment: "Attachment",
	},

	["Right Leg"]: {
		$className: "BasePart",
		RightFootAttachment: "Attachment",
	},

	Torso: {
		$className: "BasePart",
		["Left Hip"]: "Motor6D",
		["Left Shoulder"]: "Motor6D",
		["Right Hip"]: "Motor6D",
		["Right Shoulder"]: "Motor6D",
		Neck: "Motor6D",

		BodyBackAttachment: "Attachment",
		BodyFrontAttachment: "Attachment",
		LeftCollarAttachment: "Attachment",
		NeckAttachment: "Attachment",
		RightCollarAttachment: "Attachment",
		WaistBackAttachment: "Attachment",
		WaistCenterAttachment: "Attachment",
		WaistFrontAttachment: "Attachment",
	},

	// Shirt: "Shirt",
	// Pants: "Pants",

	["Body Colors"]: "BodyColors",
} as const;

export const CharacterRigR15 = {
	$className: "Model",

	HumanoidRootPart: {
		$className: "BasePart",
		RootRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		OriginalSize: "Vector3Value",
	},

	LeftHand: {
		$className: "MeshPart",
		LeftWristRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftGripAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftWrist: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	LeftLowerArm: {
		$className: "MeshPart",
		LeftElbowRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftWristRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftElbow: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	LeftUpperArm: {
		$className: "MeshPart",
		LeftShoulderRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftElbowRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftShoulderAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftShoulder: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	RightHand: {
		$className: "MeshPart",
		RightWristRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightGripAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightWrist: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	RightLowerArm: {
		$className: "MeshPart",
		RightElbowRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightWristRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightElbow: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	RightUpperArm: {
		$className: "MeshPart",
		RightShoulderRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightElbowRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightShoulderAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightShoulder: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	UpperTorso: {
		$className: "MeshPart",
		WaistRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		NeckRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftShoulderRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightShoulderRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		BodyFrontAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		BodyBackAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftCollarAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightCollarAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		NeckAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		Waist: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	LeftFoot: {
		$className: "MeshPart",
		LeftAnkleRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftAnkle: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	LeftLowerLeg: {
		$className: "MeshPart",
		LeftKneeRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftAnkleRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftKnee: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	LeftUpperLeg: {
		$className: "MeshPart",
		LeftHipRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftKneeRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftHip: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	RightFoot: {
		$className: "MeshPart",
		RightAnkleRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightAnkle: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	RightLowerLeg: {
		$className: "MeshPart",
		RightKneeRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightAnkleRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightKnee: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	RightUpperLeg: {
		$className: "MeshPart",
		RightHipRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightKneeRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightHip: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	LowerTorso: {
		$className: "MeshPart",
		RootRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		WaistRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		LeftHipRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		RightHipRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		WaistCenterAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		WaistFrontAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		WaistBackAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		Root: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	Humanoid: {
		$className: "Humanoid",
		Animator: "Animator",
		BodyTypeScale: "NumberValue",
		BodyProportionScale: "NumberValue",
		BodyWidthScale: "NumberValue",
		BodyHeightScale: "NumberValue",
		BodyDepthScale: "NumberValue",
		HeadScale: "NumberValue",
		HumanoidDescription: "HumanoidDescription",
	},

	Head: {
		$className: "MeshPart",
		FaceCenterAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		FaceFrontAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		HairAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		HatAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		NeckRigAttachment: { $className: "Attachment", OriginalPosition: "Vector3Value" },
		Neck: "Motor6D",
		OriginalSize: "Vector3Value",
	},

	// Shirt: "Shirt",
	// Pants: "Pants",

	["Body Colors"]: "BodyColors",
} as const;

export type CharacterRigR6 = EvaluateInstanceTree<typeof CharacterRigR6>;
export type CharacterRigR15 = EvaluateInstanceTree<typeof CharacterRigR15>;

/** Yields until every member of CharacterRigR6 exists */
export function promiseR6(character: Model): Promise<CharacterRigR6> {
	return promiseTree(character, CharacterRigR6);
}

/** Yields until every member of CharacterRigR15 exists */
export function promiseR15(character: Model): Promise<CharacterRigR15> {
	return promiseTree(character, CharacterRigR15);
}

export default promiseR15;
