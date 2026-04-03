create table builds
(
    id           varchar(255) not null primary key,
    name         varchar(255) null,
    game_version varchar(255) null,
    created      datetime(6)  null,
    last_seen    datetime(6)  null
);

create table player
(
    id         bigint not null primary key,
    name       varchar(255) null,
    realm      varchar(255) null,
    class_name varchar(255) null,
    group_id   varchar(255) null,
    spec       varchar(255) null,
    status     varchar(255) null
);

create table build_players
(
    player_id bigint       not null,
    build_id  varchar(255) not null,
    constraint UKqhtia1jtll4uku8d11t2svb2v
        unique (player_id),
    constraint FKcxkebq40kvthm5byjfjjhv9el
        foreign key (build_id) references builds (id),
    constraint FKpnak8gkkl4s13qso9f2llr2gi
        foreign key (player_id) references player (id)
);

create table player_seq
(
    next_val bigint null
);

insert into player_seq (next_val)
values (1);
