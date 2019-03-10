using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class AddedGroupHasActivity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "GroupHasActivity",
                columns: table => new
                {
                    GroupHasActivityId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    GroupId = table.Column<int>(nullable: false),
                    UserId = table.Column<int>(nullable: false),
                    Type = table.Column<string>(type: "varchar(25)", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "smalldatetime", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GroupHasActivity", x => x.GroupHasActivityId);
                    table.ForeignKey(
                        name: "FK_GroupHasActivity_Group_GroupId",
                        column: x => x.GroupId,
                        principalTable: "Group",
                        principalColumn: "GroupId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_GroupHasActivity_User_UserId",
                        column: x => x.UserId,
                        principalTable: "User",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_GroupHasActivity_GroupId",
                table: "GroupHasActivity",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_GroupHasActivity_UserId",
                table: "GroupHasActivity",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "GroupHasActivity");
        }
    }
}
