﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using MonAmieData;

namespace MonAmieData.Migrations
{
    [DbContext(typeof(MonAmieContext))]
    [Migration("20190312042953_Added NewVall to GroupHasActivity")]
    partial class AddedNewValltoGroupHasActivity
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.1.4-rtm-31024")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("MonAmieData.Models.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("CanEvent");

                    b.Property<bool>("CanGroup");

                    b.Property<bool>("CanInterest");

                    b.Property<string>("CategoryName")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ImageSource")
                        .IsRequired();

                    b.HasKey("CategoryId");

                    b.ToTable("Category");
                });

            modelBuilder.Entity("MonAmieData.Models.Event", b =>
                {
                    b.Property<int>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId");

                    b.Property<string>("EventName")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("EventId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Event");
                });

            modelBuilder.Entity("MonAmieData.Models.Group", b =>
                {
                    b.Property<int>("GroupId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("smalldatetime");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("varchar(500)");

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<int>("OwnerId");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("GroupId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("OwnerId");

                    b.ToTable("Group");
                });

            modelBuilder.Entity("MonAmieData.Models.GroupHasActivity", b =>
                {
                    b.Property<int>("GroupHasActivityId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("smalldatetime");

                    b.Property<int>("GroupId");

                    b.Property<string>("NewVal")
                        .HasColumnType("varchar(500)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("varchar(25)");

                    b.Property<int>("UserId");

                    b.HasKey("GroupHasActivityId");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("GroupHasActivity");
                });

            modelBuilder.Entity("MonAmieData.Models.GroupHasTag", b =>
                {
                    b.Property<int>("GroupHasTagId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GroupId");

                    b.Property<int>("TagId");

                    b.HasKey("GroupHasTagId");

                    b.HasIndex("GroupId");

                    b.HasIndex("TagId");

                    b.ToTable("GroupHasTag");
                });

            modelBuilder.Entity("MonAmieData.Models.GroupHasUser", b =>
                {
                    b.Property<int>("GroupHasUserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("GroupId");

                    b.Property<DateTime>("JoinDate")
                        .HasColumnType("smalldatetime");

                    b.Property<int>("UserId");

                    b.HasKey("GroupHasUserId");

                    b.HasIndex("GroupId");

                    b.HasIndex("UserId");

                    b.ToTable("GroupHasUser");
                });

            modelBuilder.Entity("MonAmieData.Models.Interest", b =>
                {
                    b.Property<int>("InterestId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId");

                    b.Property<string>("InterestName")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("InterestId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Interest");
                });

            modelBuilder.Entity("MonAmieData.Models.Tag", b =>
                {
                    b.Property<int>("TagId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("TagName")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("TagId");

                    b.ToTable("Tag");
                });

            modelBuilder.Entity("MonAmieData.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Bio")
                        .HasColumnType("varchar(500)");

                    b.Property<DateTime>("BirthDate")
                        .HasColumnType("date");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("smalldatetime");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("varchar(25)");

                    b.Property<DateTime?>("LastLoginDate")
                        .HasColumnType("smalldatetime");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("PasswordSalt")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("MonAmieData.Models.UserHasCategory", b =>
                {
                    b.Property<int>("UserHasCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId");

                    b.Property<int>("UserId");

                    b.HasKey("UserHasCategoryId");

                    b.HasIndex("CategoryId");

                    b.HasIndex("UserId");

                    b.ToTable("UserHasCategory");
                });

            modelBuilder.Entity("MonAmieData.Models.UserHasFriend", b =>
                {
                    b.Property<int>("UserHasFriendId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("FriendId");

                    b.Property<int>("UserId");

                    b.HasKey("UserHasFriendId");

                    b.HasIndex("FriendId");

                    b.HasIndex("UserId");

                    b.ToTable("UserHasFriend");
                });

            modelBuilder.Entity("MonAmieData.Models.UserHasFriendRequest", b =>
                {
                    b.Property<int>("UserHasFriendRequestId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PendingFriendId");

                    b.Property<int>("UserId");

                    b.HasKey("UserHasFriendRequestId");

                    b.HasIndex("PendingFriendId");

                    b.HasIndex("UserId");

                    b.ToTable("UserHasFriendRequest");
                });

            modelBuilder.Entity("MonAmieData.Models.UserHasInterest", b =>
                {
                    b.Property<int>("UserHasInterestId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("InterestId");

                    b.Property<int>("UserId");

                    b.HasKey("UserHasInterestId");

                    b.HasIndex("InterestId");

                    b.HasIndex("UserId");

                    b.ToTable("UserHasInterest");
                });

            modelBuilder.Entity("MonAmieData.Models.UserImage", b =>
                {
                    b.Property<int>("UserImageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ContentType")
                        .IsRequired()
                        .HasColumnType("varchar(50)");

                    b.Property<byte[]>("Data")
                        .IsRequired()
                        .HasColumnType("varbinary(MAX)");

                    b.Property<string>("FileName")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)");

                    b.Property<int>("Height");

                    b.Property<int>("Length");

                    b.Property<int>("UserId");

                    b.Property<int>("Width");

                    b.HasKey("UserImageId");

                    b.HasIndex("UserId");

                    b.ToTable("UserImage");
                });

            modelBuilder.Entity("MonAmieData.Models.UserMessage", b =>
                {
                    b.Property<int>("UserMessageId")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("varchar(MAX)");

                    b.Property<int>("MessageRecipientId");

                    b.Property<int>("MessageSenderId");

                    b.Property<DateTime>("SentDate")
                        .HasColumnType("smalldatetime");

                    b.HasKey("UserMessageId");

                    b.HasIndex("MessageRecipientId");

                    b.HasIndex("MessageSenderId");

                    b.ToTable("UserMessage");
                });

            modelBuilder.Entity("MonAmieData.Models.Event", b =>
                {
                    b.HasOne("MonAmieData.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MonAmieData.Models.Group", b =>
                {
                    b.HasOne("MonAmieData.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MonAmieData.Models.User", "Owner")
                        .WithMany()
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MonAmieData.Models.GroupHasActivity", b =>
                {
                    b.HasOne("MonAmieData.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MonAmieData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MonAmieData.Models.GroupHasTag", b =>
                {
                    b.HasOne("MonAmieData.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MonAmieData.Models.Tag", "Tag")
                        .WithMany()
                        .HasForeignKey("TagId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MonAmieData.Models.GroupHasUser", b =>
                {
                    b.HasOne("MonAmieData.Models.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MonAmieData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MonAmieData.Models.Interest", b =>
                {
                    b.HasOne("MonAmieData.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MonAmieData.Models.UserHasCategory", b =>
                {
                    b.HasOne("MonAmieData.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MonAmieData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MonAmieData.Models.UserHasFriend", b =>
                {
                    b.HasOne("MonAmieData.Models.User", "Friend")
                        .WithMany()
                        .HasForeignKey("FriendId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MonAmieData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MonAmieData.Models.UserHasFriendRequest", b =>
                {
                    b.HasOne("MonAmieData.Models.User", "PendingFriend")
                        .WithMany()
                        .HasForeignKey("PendingFriendId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MonAmieData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Restrict);
                });

            modelBuilder.Entity("MonAmieData.Models.UserHasInterest", b =>
                {
                    b.HasOne("MonAmieData.Models.Interest", "Interest")
                        .WithMany()
                        .HasForeignKey("InterestId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("MonAmieData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MonAmieData.Models.UserImage", b =>
                {
                    b.HasOne("MonAmieData.Models.User", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("MonAmieData.Models.UserMessage", b =>
                {
                    b.HasOne("MonAmieData.Models.User", "MessageRecipient")
                        .WithMany()
                        .HasForeignKey("MessageRecipientId")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.HasOne("MonAmieData.Models.User", "MessageSender")
                        .WithMany()
                        .HasForeignKey("MessageSenderId")
                        .OnDelete(DeleteBehavior.Restrict);
                });
#pragma warning restore 612, 618
        }
    }
}
