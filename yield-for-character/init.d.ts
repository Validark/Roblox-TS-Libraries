/// <reference types="@rbxts/types" />
/// <reference types="@rbxts/compiler-types" />
import { EvaluateInstanceTree } from "@rbxts/validate-tree";
export declare const CharacterRigR6: {
    readonly $className: "Model";
    readonly Head: {
        readonly $className: "Part";
        readonly FaceCenterAttachment: "Attachment";
        readonly FaceFrontAttachment: "Attachment";
        readonly HairAttachment: "Attachment";
        readonly HatAttachment: "Attachment";
        readonly Mesh: "SpecialMesh";
        readonly face: "Decal";
    };
    readonly HumanoidRootPart: {
        readonly $className: "Part";
        readonly RootAttachment: "Attachment";
        readonly RootJoint: "Motor6D";
    };
    readonly Humanoid: {
        readonly $className: "Humanoid";
        readonly Animator: "Animator";
        readonly HumanoidDescription: "HumanoidDescription";
    };
    readonly "Left Arm": {
        readonly $className: "Part";
        readonly LeftGripAttachment: "Attachment";
        readonly LeftShoulderAttachment: "Attachment";
    };
    readonly "Left Leg": {
        readonly $className: "Part";
        readonly LeftFootAttachment: "Attachment";
    };
    readonly "Right Arm": {
        readonly $className: "Part";
        readonly RightGripAttachment: "Attachment";
        readonly RightShoulderAttachment: "Attachment";
    };
    readonly "Right Leg": {
        readonly $className: "Part";
        readonly RightFootAttachment: "Attachment";
    };
    readonly Torso: {
        readonly $className: "Part";
        readonly "Left Hip": "Motor6D";
        readonly "Left Shoulder": "Motor6D";
        readonly "Right Hip": "Motor6D";
        readonly "Right Shoulder": "Motor6D";
        readonly Neck: "Motor6D";
        readonly BodyBackAttachment: "Attachment";
        readonly BodyFrontAttachment: "Attachment";
        readonly LeftCollarAttachment: "Attachment";
        readonly NeckAttachment: "Attachment";
        readonly RightCollarAttachment: "Attachment";
        readonly WaistBackAttachment: "Attachment";
        readonly WaistCenterAttachment: "Attachment";
        readonly WaistFrontAttachment: "Attachment";
    };
    readonly "Body Colors": "BodyColors";
};
export declare const CharacterRigR15: {
    readonly $className: "Model";
    readonly HumanoidRootPart: {
        readonly $className: "Part";
        readonly RootRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly OriginalSize: "Vector3Value";
    };
    readonly LeftHand: {
        readonly $className: "MeshPart";
        readonly LeftWristRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftGripAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftWrist: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly LeftLowerArm: {
        readonly $className: "MeshPart";
        readonly LeftElbowRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftWristRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftElbow: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly LeftUpperArm: {
        readonly $className: "MeshPart";
        readonly LeftShoulderRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftElbowRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftShoulderAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftShoulder: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly RightHand: {
        readonly $className: "MeshPart";
        readonly RightWristRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightGripAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightWrist: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly RightLowerArm: {
        readonly $className: "MeshPart";
        readonly RightElbowRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightWristRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightElbow: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly RightUpperArm: {
        readonly $className: "MeshPart";
        readonly RightShoulderRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightElbowRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightShoulderAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightShoulder: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly UpperTorso: {
        readonly $className: "MeshPart";
        readonly WaistRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly NeckRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftShoulderRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightShoulderRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly BodyFrontAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly BodyBackAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftCollarAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightCollarAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly NeckAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly Waist: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly LeftFoot: {
        readonly $className: "MeshPart";
        readonly LeftAnkleRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftAnkle: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly LeftLowerLeg: {
        readonly $className: "MeshPart";
        readonly LeftKneeRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftAnkleRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftKnee: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly LeftUpperLeg: {
        readonly $className: "MeshPart";
        readonly LeftHipRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftKneeRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftHip: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly RightFoot: {
        readonly $className: "MeshPart";
        readonly RightAnkleRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightAnkle: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly RightLowerLeg: {
        readonly $className: "MeshPart";
        readonly RightKneeRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightAnkleRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightKnee: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly RightUpperLeg: {
        readonly $className: "MeshPart";
        readonly RightHipRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightKneeRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightHip: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly LowerTorso: {
        readonly $className: "MeshPart";
        readonly RootRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly WaistRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftHipRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightHipRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly WaistCenterAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly WaistFrontAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly WaistBackAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly Root: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    readonly Humanoid: {
        readonly $className: "Humanoid";
        readonly Animator: "Animator";
        readonly BodyTypeScale: "NumberValue";
        readonly BodyProportionScale: "NumberValue";
        readonly BodyWidthScale: "NumberValue";
        readonly BodyHeightScale: "NumberValue";
        readonly BodyDepthScale: "NumberValue";
        readonly HeadScale: "NumberValue";
        readonly HumanoidDescription: "HumanoidDescription";
    };
    readonly Head: {
        readonly $className: "MeshPart";
        readonly FaceCenterAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly FaceFrontAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly HairAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly HatAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly NeckRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly Neck: "Motor6D";
        readonly face: "Decal";
        readonly OriginalSize: "Vector3Value";
    };
    readonly "Body Colors": "BodyColors";
};
export declare type CharacterRigR6 = EvaluateInstanceTree<typeof CharacterRigR6>;
export declare type CharacterRigR15 = EvaluateInstanceTree<typeof CharacterRigR15>;
/** Yields until every member of CharacterRigR6 exists */
export declare function yieldForR6CharacterDescendants(character: Model): Promise<CharacterRigR6>;
/** Yields until every member of CharacterRigR15 exists */
export declare function yieldForR15CharacterDescendants(character: Model): Promise<CharacterRigR15>;
export default yieldForR15CharacterDescendants;
