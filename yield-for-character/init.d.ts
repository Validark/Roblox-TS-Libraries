/// <reference types="@rbxts/types" />
import { EvaluateInstanceTree } from "@rbxts/validate-tree";
export declare const CharacterRigR6: {
    readonly $className: "Model";
    Head: {
        readonly $className: "Part";
        readonly FaceCenterAttachment: "Attachment";
        readonly FaceFrontAttachment: "Attachment";
        readonly HairAttachment: "Attachment";
        readonly HatAttachment: "Attachment";
        readonly Mesh: "SpecialMesh";
        readonly face: "Decal";
    };
    HumanoidRootPart: {
        readonly $className: "Part";
        readonly RootAttachment: "Attachment";
        readonly RootJoint: "Motor6D";
    };
    Humanoid: {
        readonly $className: "Humanoid";
        readonly Animator: "Animator";
        readonly HumanoidDescription: "HumanoidDescription";
        readonly Status: "Status";
    };
    "Left Arm": {
        readonly $className: "Part";
        readonly LeftGripAttachment: "Attachment";
        readonly LeftShoulderAttachment: "Attachment";
    };
    "Left Leg": {
        readonly $className: "Part";
        readonly LeftFootAttachment: "Attachment";
    };
    "Right Arm": {
        readonly $className: "Part";
        readonly RightGripAttachment: "Attachment";
        readonly RightShoulderAttachment: "Attachment";
    };
    "Right Leg": {
        readonly $className: "Part";
        readonly RightFootAttachment: "Attachment";
    };
    Torso: {
        readonly $className: "Part";
        readonly ["Left Hip"]: "Motor6D";
        readonly ["Left Shoulder"]: "Motor6D";
        readonly ["Right Hip"]: "Motor6D";
        readonly ["Right Shoulder"]: "Motor6D";
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
    readonly Shirt: "Shirt";
    readonly Pants: "Pants";
    readonly ["Body Colors"]: "BodyColors";
};
export declare const CharacterRigR15: {
    readonly $className: "Model";
    HumanoidRootPart: {
        readonly $className: "Part";
        RootRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly OriginalSize: "Vector3Value";
    };
    LeftHand: {
        readonly $className: "MeshPart";
        LeftWristRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftGripAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftWrist: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    LeftLowerArm: {
        readonly $className: "MeshPart";
        LeftElbowRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftWristRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftElbow: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    LeftUpperArm: {
        readonly $className: "MeshPart";
        LeftShoulderRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftElbowRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftShoulderAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftShoulder: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    RightHand: {
        readonly $className: "MeshPart";
        RightWristRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightGripAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightWrist: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    RightLowerArm: {
        readonly $className: "MeshPart";
        RightElbowRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightWristRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightElbow: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    RightUpperArm: {
        readonly $className: "MeshPart";
        RightShoulderRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightElbowRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightShoulderAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightShoulder: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    UpperTorso: {
        readonly $className: "MeshPart";
        WaistRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        NeckRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftShoulderRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightShoulderRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        BodyFrontAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        BodyBackAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftCollarAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightCollarAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        NeckAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly Waist: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    LeftFoot: {
        readonly $className: "MeshPart";
        LeftAnkleRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftAnkle: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    LeftLowerLeg: {
        readonly $className: "MeshPart";
        LeftKneeRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftAnkleRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftKnee: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    LeftUpperLeg: {
        readonly $className: "MeshPart";
        LeftHipRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftKneeRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly LeftHip: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    RightFoot: {
        readonly $className: "MeshPart";
        RightAnkleRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightAnkle: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    RightLowerLeg: {
        readonly $className: "MeshPart";
        RightKneeRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightAnkleRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightKnee: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    RightUpperLeg: {
        readonly $className: "MeshPart";
        RightHipRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightKneeRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly RightHip: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    LowerTorso: {
        readonly $className: "MeshPart";
        RootRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        WaistRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        LeftHipRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        RightHipRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        WaistCenterAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        WaistFrontAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        WaistBackAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly Root: "Motor6D";
        readonly OriginalSize: "Vector3Value";
    };
    Humanoid: {
        readonly $className: "Humanoid";
        readonly Animator: "Animator";
        readonly BodyTypeScale: "NumberValue";
        readonly BodyProportionScale: "NumberValue";
        readonly BodyWidthScale: "NumberValue";
        readonly BodyHeightScale: "NumberValue";
        readonly BodyDepthScale: "NumberValue";
        readonly HeadScale: "NumberValue";
        readonly HumanoidDescription: "HumanoidDescription";
        readonly Status: "Status";
    };
    Head: {
        readonly $className: "Part";
        Mesh: {
            readonly $className: "SpecialMesh";
            readonly OriginalSize: "Vector3Value";
        };
        FaceCenterAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        FaceFrontAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        HairAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        HatAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        NeckRigAttachment: {
            readonly $className: "Attachment";
            readonly OriginalPosition: "Vector3Value";
        };
        readonly Neck: "Motor6D";
        readonly face: "Decal";
        readonly OriginalSize: "Vector3Value";
    };
    readonly Shirt: "Shirt";
    readonly Pants: "Pants";
    readonly ["Body Colors"]: "BodyColors";
};
export declare type CharacterRigR6 = EvaluateInstanceTree<typeof CharacterRigR6>;
export declare type CharacterRigR15 = EvaluateInstanceTree<typeof CharacterRigR15>;
/** Yields until every member of CharacterRigR6 exists */
export declare function yieldForR6CharacterDescendants(character: Model): Promise<CharacterRigR6>;
/** Yields until every member of CharacterRigR15 exists */
export declare function yieldForR15CharacterDescendants(character: Model): Promise<CharacterRigR15>;
export default yieldForR15CharacterDescendants;
