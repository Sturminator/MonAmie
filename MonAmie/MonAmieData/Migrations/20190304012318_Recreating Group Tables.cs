using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class RecreatingGroupTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Group",
                columns: table => new
                {
                    GroupId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GroupName = table.Column<string>(type: "varchar(50)", nullable: false),
                    Description = table.Column<string>(type: "varchar(500)", nullable: false),
                    State = table.Column<string>(type: "varchar(50)", nullable: false),
                    CategoryId = table.Column<int>(nullable: false),
                    OwnerId = table.Column<int>(nullable: false),
                    CreationDate = table.Column<DateTime>(type: "smalldatetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.GroupId);
                    table.ForeignKey(
                        name: "FK_Group_Category_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Category",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Group_User_OwnerId",
                        column: x => x.OwnerId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "GroupHasTag",
                columns: table => new
                {
                    GroupHasTagId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GroupId = table.Column<int>(nullable: false),
                    TagId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupHasTag", x => x.GroupHasTagId);
                    table.ForeignKey(
                        name: "FK_GroupHasTag_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupHasTag_Tag_TagId",
                        column: x => x.TagId,
                        principalTable: "Tag",
                        principalColumn: "TagId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "GroupHasUser",
                columns: table => new
                {
                    GroupHasUserId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GroupId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    JoinDate = table.Column<DateTime>(type: "smalldatetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupHasUser", x => x.GroupHasUserId);
                    table.ForeignKey(
                        name: "FK_GroupHasUser_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GroupHasUser_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Group_CategoryId",
                table: "Group",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Group_OwnerId",
                table: "Group",
                column: "OwnerId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupHasTag_GroupId",
                table: "GroupHasTag",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupHasTag_TagId",
                table: "GroupHasTag",
                column: "TagId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupHasUser_GroupId",
                table: "GroupHasUser",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupHasUser_UserId",
                table: "GroupHasUser",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupHasTag");

            migrationBuilder.DropTable(
                name: "GroupHasUser");

            migrationBuilder.DropTable(
                name: "Group");
        }
    }
}
