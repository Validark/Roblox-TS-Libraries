-- Compiled with https://roblox-ts.github.io v0.2.14
-- July 30, 2019, 9:35 AM Central Daylight Time

local TS = _G[script];
local exports = {};
local yieldForTree = TS.import(TS.getModule("validate-tree")).yieldForTree;
local CharacterRigR6 = {
	["$className"] = "Model";
	Head = {
		["$className"] = "Part";
		FaceCenterAttachment = "Attachment";
		FaceFrontAttachment = "Attachment";
		HairAttachment = "Attachment";
		HatAttachment = "Attachment";
		Mesh = "SpecialMesh";
		face = "Decal";
	};
	HumanoidRootPart = {
		["$className"] = "Part";
		RootAttachment = "Attachment";
		RootJoint = "Motor6D";
	};
	Humanoid = {
		["$className"] = "Humanoid";
		Animator = "Animator";
		HumanoidDescription = "HumanoidDescription";
		Status = "Status";
	};
	["Left Arm"] = {
		["$className"] = "Part";
		LeftGripAttachment = "Attachment";
		LeftShoulderAttachment = "Attachment";
	};
	["Left Leg"] = {
		["$className"] = "Part";
		LeftFootAttachment = "Attachment";
	};
	["Right Arm"] = {
		["$className"] = "Part";
		RightGripAttachment = "Attachment";
		RightShoulderAttachment = "Attachment";
	};
	["Right Leg"] = {
		["$className"] = "Part";
		RightFootAttachment = "Attachment";
	};
	Torso = {
		["$className"] = "Part";
		["Left Hip"] = "Motor6D";
		["Left Shoulder"] = "Motor6D";
		["Right Hip"] = "Motor6D";
		["Right Shoulder"] = "Motor6D";
		Neck = "Motor6D";
		BodyBackAttachment = "Attachment";
		BodyFrontAttachment = "Attachment";
		LeftCollarAttachment = "Attachment";
		NeckAttachment = "Attachment";
		RightCollarAttachment = "Attachment";
		WaistBackAttachment = "Attachment";
		WaistCenterAttachment = "Attachment";
		WaistFrontAttachment = "Attachment";
	};
	["Body Colors"] = "BodyColors";
};
local CharacterRigR15 = {
	["$className"] = "Model";
	HumanoidRootPart = {
		["$className"] = "Part";
		RootRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		OriginalSize = "Vector3Value";
	};
	LeftHand = {
		["$className"] = "MeshPart";
		LeftWristRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftGripAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftWrist = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	LeftLowerArm = {
		["$className"] = "MeshPart";
		LeftElbowRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftWristRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftElbow = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	LeftUpperArm = {
		["$className"] = "MeshPart";
		LeftShoulderRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftElbowRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftShoulderAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftShoulder = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	RightHand = {
		["$className"] = "MeshPart";
		RightWristRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightGripAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightWrist = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	RightLowerArm = {
		["$className"] = "MeshPart";
		RightElbowRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightWristRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightElbow = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	RightUpperArm = {
		["$className"] = "MeshPart";
		RightShoulderRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightElbowRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightShoulderAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightShoulder = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	UpperTorso = {
		["$className"] = "MeshPart";
		WaistRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		NeckRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftShoulderRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightShoulderRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		BodyFrontAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		BodyBackAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftCollarAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightCollarAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		NeckAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		Waist = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	LeftFoot = {
		["$className"] = "MeshPart";
		LeftAnkleRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftAnkle = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	LeftLowerLeg = {
		["$className"] = "MeshPart";
		LeftKneeRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftAnkleRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftKnee = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	LeftUpperLeg = {
		["$className"] = "MeshPart";
		LeftHipRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftKneeRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftHip = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	RightFoot = {
		["$className"] = "MeshPart";
		RightAnkleRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightAnkle = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	RightLowerLeg = {
		["$className"] = "MeshPart";
		RightKneeRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightAnkleRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightKnee = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	RightUpperLeg = {
		["$className"] = "MeshPart";
		RightHipRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightKneeRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightHip = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	LowerTorso = {
		["$className"] = "MeshPart";
		RootRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		WaistRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		LeftHipRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		RightHipRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		WaistCenterAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		WaistFrontAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		WaistBackAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		Root = "Motor6D";
		OriginalSize = "Vector3Value";
	};
	Humanoid = {
		["$className"] = "Humanoid";
		Animator = "Animator";
		BodyTypeScale = "NumberValue";
		BodyProportionScale = "NumberValue";
		BodyWidthScale = "NumberValue";
		BodyHeightScale = "NumberValue";
		BodyDepthScale = "NumberValue";
		HeadScale = "NumberValue";
		HumanoidDescription = "HumanoidDescription";
		Status = "Status";
	};
	Head = {
		["$className"] = "Part";
		Mesh = {
			["$className"] = "SpecialMesh";
			OriginalSize = "Vector3Value";
		};
		FaceCenterAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		FaceFrontAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		HairAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		HatAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		NeckRigAttachment = {
			["$className"] = "Attachment";
			OriginalPosition = "Vector3Value";
		};
		Neck = "Motor6D";
		face = "Decal";
		OriginalSize = "Vector3Value";
	};
	["Body Colors"] = "BodyColors";
};
local function yieldForR6CharacterDescendants(character)
	return yieldForTree(character, CharacterRigR6);
end;
local function yieldForR15CharacterDescendants(character)
	return yieldForTree(character, CharacterRigR15);
end;
exports.default = yieldForR15CharacterDescendants;
exports.CharacterRigR6 = CharacterRigR6;
exports.CharacterRigR15 = CharacterRigR15;
exports.yieldForR6CharacterDescendants = yieldForR6CharacterDescendants;
exports.yieldForR15CharacterDescendants = yieldForR15CharacterDescendants;
return exports;
