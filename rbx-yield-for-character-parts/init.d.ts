interface HasOriginalSize {
    /** The original size of this Part, according to the HumanoidDescription */
    OriginalSize: Vector3Value;
}
declare type RigAttachment = Attachment & {
    /** The original position of this Attachment, according to the HumanoidDescription */
    OriginalPosition: Vector3Value;
};
export declare type CharacterRigR15 = Model & {
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
export declare type CharacterRigR6 = Model & {
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
export declare function yieldForR6CharacterDescendants(character: Model): CharacterRigR6;
/** Yields until every member of CharacterRigR15 exists */
export declare function yieldForR15CharacterDescendants(character: Model): CharacterRigR15;
export default yieldForR15CharacterDescendants;
