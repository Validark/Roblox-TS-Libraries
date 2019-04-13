interface HasOriginalSize {
	/** The original size of this Part, according to the HumanoidDescription */
	OriginalSize: Vector3Value;
}

type RigAttachment = Attachment & {
	/** The original position of this Attachment, according to the HumanoidDescription */
	OriginalPosition: Vector3Value;
};

export type CharacterRigR15 = Model & {
	HumanoidRootPart: Part & {
		RootRigAttachment: RigAttachment;
	} & HasOriginalSize;

	LeftHand: MeshPart & {
		LeftWristRigAttachment: RigAttachment;
		LeftGripAttachment: RigAttachment;
		LeftWrist: Motor6D;
	} & HasOriginalSize;

	LeftLowerArm: MeshPart & {
		LeftElbowRigAttachment: RigAttachment;
		LeftWristRigAttachment: RigAttachment;
		LeftElbow: Motor6D;
	} & HasOriginalSize;

	LeftUpperArm: MeshPart & {
		LeftShoulderRigAttachment: RigAttachment;
		LeftElbowRigAttachment: RigAttachment;
		LeftShoulderAttachment: RigAttachment;
		LeftShoulder: Motor6D;
	} & HasOriginalSize;

	RightHand: MeshPart & {
		RightWristRigAttachment: RigAttachment;
		RightGripAttachment: RigAttachment;
		RightWrist: Motor6D;
	} & HasOriginalSize;

	RightLowerArm: MeshPart & {
		RightElbowRigAttachment: RigAttachment;
		RightWristRigAttachment: RigAttachment;
		RightElbow: Motor6D;
	} & HasOriginalSize;

	RightUpperArm: MeshPart & {
		RightShoulderRigAttachment: RigAttachment;
		RightElbowRigAttachment: RigAttachment;
		RightShoulderAttachment: RigAttachment;
		RightShoulder: Motor6D;
	} & HasOriginalSize;

	UpperTorso: MeshPart & {
		WaistRigAttachment: RigAttachment;
		NeckRigAttachment: RigAttachment;
		LeftShoulderRigAttachment: RigAttachment;
		RightShoulderRigAttachment: RigAttachment;
		BodyFrontAttachment: RigAttachment;
		BodyBackAttachment: RigAttachment;
		LeftCollarAttachment: RigAttachment;
		RightCollarAttachment: RigAttachment;
		NeckAttachment: RigAttachment;
		Waist: Motor6D;
	} & HasOriginalSize;

	LeftFoot: MeshPart & {
		LeftAnkleRigAttachment: RigAttachment;
		LeftAnkle: Motor6D;
	} & HasOriginalSize;

	LeftLowerLeg: MeshPart & {
		LeftKneeRigAttachment: RigAttachment;
		LeftAnkleRigAttachment: RigAttachment;
		LeftKnee: Motor6D;
	} & HasOriginalSize;

	LeftUpperLeg: MeshPart & {
		LeftHipRigAttachment: RigAttachment;
		LeftKneeRigAttachment: RigAttachment;
		LeftHip: Motor6D;
	} & HasOriginalSize;

	RightFoot: MeshPart & {
		RightAnkleRigAttachment: RigAttachment;
		RightAnkle: Motor6D;
	} & HasOriginalSize;

	RightLowerLeg: MeshPart & {
		RightKneeRigAttachment: RigAttachment;
		RightAnkleRigAttachment: RigAttachment;
		RightKnee: Motor6D;
	} & HasOriginalSize;

	RightUpperLeg: MeshPart & {
		RightHipRigAttachment: RigAttachment;
		RightKneeRigAttachment: RigAttachment;
		RightHip: Motor6D;
	} & HasOriginalSize;

	LowerTorso: MeshPart & {
		RootRigAttachment: RigAttachment;
		WaistRigAttachment: RigAttachment;
		LeftHipRigAttachment: RigAttachment;
		RightHipRigAttachment: RigAttachment;
		WaistCenterAttachment: RigAttachment;
		WaistFrontAttachment: RigAttachment;
		WaistBackAttachment: RigAttachment;
		Root: Motor6D;
	} & HasOriginalSize;

	Humanoid: Humanoid & {
		Animator: Animator;
		BodyTypeScale: number;
		BodyProportionScale: number;
		BodyWidthScale: number;
		BodyHeightScale: number;
		BodyDepthScale: number;
		HeadScale: number;
		HumanoidDescription: HumanoidDescription;
		Status: Status;
	};

	Head: Part & {
		Mesh: SpecialMesh & HasOriginalSize;
		FaceCenterAttachment: RigAttachment;
		FaceFrontAttachment: RigAttachment;
		HairAttachment: RigAttachment;
		HatAttachment: RigAttachment;
		NeckRigAttachment: RigAttachment;
		Neck: Motor6D;
		face: Decal;
	} & HasOriginalSize;

	Shirt: Shirt;
	Pants: Pants;

	["Body Colors"]: BodyColors;
};

export type CharacterRigR6 = Model & {
	Head: Part & {
		FaceCenterAttachment: Attachment;
		FaceFrontAttachment: Attachment;
		HairAttachment: Attachment;
		HatAttachment: Attachment;
		Mesh: SpecialMesh;
		face: Decal;
	};

	HumanoidRootPart: Part & {
		RootAttachment: Attachment;
		RootJoint: Motor6D;
	};

	Humanoid: Humanoid & {
		Animator: Animator;
		HumanoidDescription: HumanoidDescription;
		Status: Status;
	};

	["Left Arm"]: Part & {
		LeftGripAttachment: Attachment;
		LeftShoulderAttachment: Attachment;
	};

	["Left Leg"]: Part & {
		LeftFootAttachment: Attachment;
	};

	["Right Arm"]: Part & {
		RightGripAttachment: Attachment;
		RightShoulderAttachment: Attachment;
	};

	["Right Leg"]: Part & {
		RightFootAttachment: Attachment;
	};

	Torso: Part & {
		["Left Hip"]: Motor6D;
		["Left Shoulder"]: Motor6D;
		["Right Hip"]: Motor6D;
		["Right Shoulder"]: Motor6D;
		Neck: Motor6D;

		BodyBackAttachment: Attachment;
		BodyFrontAttachment: Attachment;
		LeftCollarAttachment: Attachment;
		NeckAttachment: Attachment;
		RightCollarAttachment: Attachment;
		WaistBackAttachment: Attachment;
		WaistCenterAttachment: Attachment;
		WaistFrontAttachment: Attachment;
	};

	Shirt: Shirt;
	Pants: Pants;

	["Body Colors"]: BodyColors;
};

export async function yieldForR6CharacterDescendants(character: Model) {
	const Head = character.WaitForChild("Head");
	Head.WaitForChild("FaceCenterAttachment");
	Head.WaitForChild("FaceFrontAttachment");
	Head.WaitForChild("HairAttachment");
	Head.WaitForChild("HatAttachment");
	Head.WaitForChild("Mesh");
	Head.WaitForChild("face");

	const HumanoidRootPart = character.WaitForChild("HumanoidRootPart");
	HumanoidRootPart.WaitForChild("RootAttachment");
	HumanoidRootPart.WaitForChild("RootJoint");

	const Humanoid = character.WaitForChild("Humanoid");
	Humanoid.WaitForChild("Animator");
	Humanoid.WaitForChild("HumanoidDescription");
	Humanoid.WaitForChild("Status");

	const LeftArm = character.WaitForChild("Left Arm");
	LeftArm.WaitForChild("LeftGripAttachment");
	LeftArm.WaitForChild("LeftShoulderAttachment");

	const LeftLeg = character.WaitForChild("Left Leg");
	LeftLeg.WaitForChild("LeftFootAttachment");

	const RightArm = character.WaitForChild("Right Arm");
	RightArm.WaitForChild("RightGripAttachment");
	RightArm.WaitForChild("RightShoulderAttachment");

	const RightLeg = character.WaitForChild("Right Leg");
	RightLeg.WaitForChild("RightFootAttachment");

	const Torso = character.WaitForChild("Torso");
	Torso.WaitForChild("Left Hip");
	Torso.WaitForChild("Left Shoulder");
	Torso.WaitForChild("Right Hip");
	Torso.WaitForChild("Right Shoulder");
	Torso.WaitForChild("Neck");
	Torso.WaitForChild("BodyBackAttachment");
	Torso.WaitForChild("BodyFrontAttachment");
	Torso.WaitForChild("LeftCollarAttachment");
	Torso.WaitForChild("NeckAttachment");
	Torso.WaitForChild("RightCollarAttachment");
	Torso.WaitForChild("WaistBackAttachment");
	Torso.WaitForChild("WaistCenterAttachment");
	Torso.WaitForChild("WaistFrontAttachment");

	character.WaitForChild("Shirt");
	character.WaitForChild("Pants");
	character.WaitForChild("Body Colors");

	return character as CharacterRigR6;
}

/** Yields until every member of CharacterRigR15 exists */
export async function yieldForR15CharacterDescendants(character: Model) {
	const HumanoidRootPart = character.WaitForChild("HumanoidRootPart");
	HumanoidRootPart.WaitForChild("RootRigAttachment").WaitForChild("OriginalPosition");
	HumanoidRootPart.WaitForChild("OriginalSize");

	const LeftHand = character.WaitForChild("LeftHand");
	LeftHand.WaitForChild("LeftWristRigAttachment").WaitForChild("OriginalPosition");
	LeftHand.WaitForChild("LeftGripAttachment").WaitForChild("OriginalPosition");
	LeftHand.WaitForChild("LeftWrist");
	LeftHand.WaitForChild("OriginalSize");

	const LeftLowerArm = character.WaitForChild("LeftLowerArm");
	LeftLowerArm.WaitForChild("LeftElbowRigAttachment").WaitForChild("OriginalPosition");
	LeftLowerArm.WaitForChild("LeftWristRigAttachment").WaitForChild("OriginalPosition");
	LeftLowerArm.WaitForChild("LeftElbow");
	LeftLowerArm.WaitForChild("OriginalSize");

	const LeftUpperArm = character.WaitForChild("LeftUpperArm");
	LeftUpperArm.WaitForChild("LeftShoulderRigAttachment").WaitForChild("OriginalPosition");
	LeftUpperArm.WaitForChild("LeftElbowRigAttachment").WaitForChild("OriginalPosition");
	LeftUpperArm.WaitForChild("LeftShoulderAttachment").WaitForChild("OriginalPosition");
	LeftUpperArm.WaitForChild("LeftShoulder");
	LeftUpperArm.WaitForChild("OriginalSize");

	const RightHand = character.WaitForChild("RightHand");
	RightHand.WaitForChild("RightWristRigAttachment").WaitForChild("OriginalPosition");
	RightHand.WaitForChild("RightGripAttachment").WaitForChild("OriginalPosition");
	RightHand.WaitForChild("RightWrist");
	RightHand.WaitForChild("OriginalSize");

	const RightLowerArm = character.WaitForChild("RightLowerArm");
	RightLowerArm.WaitForChild("RightElbowRigAttachment").WaitForChild("OriginalPosition");
	RightLowerArm.WaitForChild("RightWristRigAttachment").WaitForChild("OriginalPosition");
	RightLowerArm.WaitForChild("RightElbow");
	RightLowerArm.WaitForChild("OriginalSize");

	const RightUpperArm = character.WaitForChild("RightUpperArm");
	RightUpperArm.WaitForChild("RightShoulderRigAttachment").WaitForChild("OriginalPosition");
	RightUpperArm.WaitForChild("RightElbowRigAttachment").WaitForChild("OriginalPosition");
	RightUpperArm.WaitForChild("RightShoulderAttachment").WaitForChild("OriginalPosition");
	RightUpperArm.WaitForChild("RightShoulder");
	RightUpperArm.WaitForChild("OriginalSize");

	const UpperTorso = character.WaitForChild("UpperTorso");
	UpperTorso.WaitForChild("WaistRigAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("NeckRigAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("LeftShoulderRigAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("RightShoulderRigAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("BodyFrontAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("BodyBackAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("LeftCollarAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("RightCollarAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("NeckAttachment").WaitForChild("OriginalPosition");
	UpperTorso.WaitForChild("Waist");
	UpperTorso.WaitForChild("OriginalSize");

	const LeftFoot = character.WaitForChild("LeftFoot");
	LeftFoot.WaitForChild("LeftAnkleRigAttachment").WaitForChild("OriginalPosition");
	LeftFoot.WaitForChild("LeftAnkle");
	LeftFoot.WaitForChild("OriginalSize");

	const LeftLowerLeg = character.WaitForChild("LeftLowerLeg");
	LeftLowerLeg.WaitForChild("LeftKneeRigAttachment").WaitForChild("OriginalPosition");
	LeftLowerLeg.WaitForChild("LeftAnkleRigAttachment").WaitForChild("OriginalPosition");
	LeftLowerLeg.WaitForChild("LeftKnee");
	LeftLowerLeg.WaitForChild("OriginalSize");

	const LeftUpperLeg = character.WaitForChild("LeftUpperLeg");
	LeftUpperLeg.WaitForChild("LeftHipRigAttachment").WaitForChild("OriginalPosition");
	LeftUpperLeg.WaitForChild("LeftKneeRigAttachment").WaitForChild("OriginalPosition");
	LeftUpperLeg.WaitForChild("LeftHip");
	LeftUpperLeg.WaitForChild("OriginalSize");

	const RightFoot = character.WaitForChild("RightFoot");
	RightFoot.WaitForChild("RightAnkleRigAttachment").WaitForChild("OriginalPosition");
	RightFoot.WaitForChild("RightAnkle");
	RightFoot.WaitForChild("OriginalSize");

	const RightLowerLeg = character.WaitForChild("RightLowerLeg");
	RightLowerLeg.WaitForChild("RightKneeRigAttachment").WaitForChild("OriginalPosition");
	RightLowerLeg.WaitForChild("RightAnkleRigAttachment").WaitForChild("OriginalPosition");
	RightLowerLeg.WaitForChild("RightKnee");
	RightLowerLeg.WaitForChild("OriginalSize");

	const RightUpperLeg = character.WaitForChild("RightUpperLeg");
	RightUpperLeg.WaitForChild("RightHipRigAttachment").WaitForChild("OriginalPosition");
	RightUpperLeg.WaitForChild("RightKneeRigAttachment").WaitForChild("OriginalPosition");
	RightUpperLeg.WaitForChild("RightHip");
	RightUpperLeg.WaitForChild("OriginalSize");

	const LowerTorso = character.WaitForChild("LowerTorso");
	LowerTorso.WaitForChild("RootRigAttachment").WaitForChild("OriginalPosition");
	LowerTorso.WaitForChild("WaistRigAttachment").WaitForChild("OriginalPosition");
	LowerTorso.WaitForChild("LeftHipRigAttachment").WaitForChild("OriginalPosition");
	LowerTorso.WaitForChild("RightHipRigAttachment").WaitForChild("OriginalPosition");
	LowerTorso.WaitForChild("WaistCenterAttachment").WaitForChild("OriginalPosition");
	LowerTorso.WaitForChild("WaistFrontAttachment").WaitForChild("OriginalPosition");
	LowerTorso.WaitForChild("WaistBackAttachment").WaitForChild("OriginalPosition");
	LowerTorso.WaitForChild("Root");
	LowerTorso.WaitForChild("OriginalSize");

	const Humanoid = character.WaitForChild("Humanoid");
	Humanoid.WaitForChild("Animator");
	Humanoid.WaitForChild("BodyTypeScale");
	Humanoid.WaitForChild("BodyProportionScale");
	Humanoid.WaitForChild("BodyWidthScale");
	Humanoid.WaitForChild("BodyHeightScale");
	Humanoid.WaitForChild("BodyDepthScale");
	Humanoid.WaitForChild("HeadScale");
	Humanoid.WaitForChild("HumanoidDescription");
	Humanoid.WaitForChild("Status");

	const Head = character.WaitForChild("Head");
	Head.WaitForChild("Mesh").WaitForChild("OriginalSize");
	Head.WaitForChild("FaceCenterAttachment").WaitForChild("OriginalPosition");
	Head.WaitForChild("FaceFrontAttachment").WaitForChild("OriginalPosition");
	Head.WaitForChild("HairAttachment").WaitForChild("OriginalPosition");
	Head.WaitForChild("HatAttachment").WaitForChild("OriginalPosition");
	Head.WaitForChild("NeckRigAttachment").WaitForChild("OriginalPosition");
	Head.WaitForChild("Neck");
	Head.WaitForChild("OriginalSize");
	Head.WaitForChild("face");

	character.WaitForChild("Pants");
	character.WaitForChild("Shirt");
	character.WaitForChild("Body Colors");

	return character as CharacterRigR15;
}

export default yieldForR15CharacterDescendants;
