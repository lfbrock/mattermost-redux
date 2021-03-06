// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import {Audit} from './audits';
import {Channel} from './channels';
import {Team} from './teams';
import {PostType} from './posts';
import {Session} from './sessions';
import {Group} from './groups';
import {$ID, IDMappedObjects, RelationOneToMany, RelationOneToOne, Dictionary} from './utilities';

export type UserNotifyProps = {
    desktop: 'default' | 'all' | 'mention' | 'none';
    desktop_sound: 'true' | 'false';
    email: 'true' | 'false';
    mark_unread: 'all' | 'mention';
    push: 'default' | 'all' | 'mention' | 'none';
    push_status: 'ooo' | 'offline' | 'away' | 'dnd' | 'online';
    comments: 'never' | 'root' | 'any';
    first_name: 'true' | 'false';
    channel: 'true' | 'false';
    mention_keys: string;
};

export type UserProfile = {
    id: string;
    create_at: number;
    update_at: number;
    delete_at: number;
    username: string;
    password: string;
    auth_data: string;
    auth_service: string;
    email: string;
    email_verified: boolean;
    nickname: string;
    first_name: string;
    last_name: string;
    position: string;
    roles: string;
    allow_marketing: boolean;
    props: Dictionary<string>;
    notify_props: UserNotifyProps;
    last_password_update: number;
    last_picture_update: number;
    failed_attempts: number;
    locale: string;
    timezone?: UserTimezone;
    mfa_active: boolean;
    mfa_secret: string;
    last_activity_at: number;
    is_bot: boolean;
    bot_description: string;
    bot_last_icon_update: number;
    terms_of_service_id: string;
    terms_of_service_create_at: number;
};

export type UsersState = {
    currentUserId: string;
    isManualStatus: RelationOneToOne<UserProfile, boolean>;
    mySessions: Array<Session>;
    myAudits: Array<Audit>;
    profiles: IDMappedObjects<UserProfile>;
    profilesInTeam: RelationOneToMany<Team, UserProfile>;
    profilesNotInTeam: RelationOneToMany<Team, UserProfile>;
    profilesWithoutTeam: Set<string>;
    profilesInChannel: RelationOneToMany<Channel, UserProfile>;
    profilesNotInChannel: RelationOneToMany<Channel, UserProfile>;
    profilesInGroup: RelationOneToMany<Group, UserProfile>;
    statuses: RelationOneToOne<UserProfile, string>;
    stats: RelationOneToOne<UserProfile, UsersStats>;
};

export type UserTimezone = {
    useAutomaticTimezone: boolean | string;
    automaticTimezone: string;
    manualTimezone: string;
};

export type UserActivity = {
    [x in PostType]: {
        [x in $ID<UserProfile>]: | {
            ids: Array<$ID<UserProfile>>;
            usernames: Array<UserProfile['username']>;
        } | Array<$ID<UserProfile>>;
    };
};

export type UserStatus = {
	user_id: string;
	status: string;
	manual: boolean;
	last_activity_at: number;
	active_channel?: string;
};

export type UserAccessToken = {
    id: string;
    token?: string;
    user_id: string;
    description: string;
    is_active: boolean;
};

export type UsersStats = {
    total_user_count: number;
};

export type AuthChangeResponse = {
    follow_link: string;
};
