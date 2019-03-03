using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MonAmieData.Migrations
{
    public partial class UpdatetoGroup : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "FileName",
                table: "UserImage",
                type: "nvarchar(200)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(200)");

            migrationBuilder.AlterColumn<string>(
                name: "GroupName",
                table: "Group",
                type: "varchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(255)");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Group",
                type: "varchar(500)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "Group");

            migrationBuilder.AlterColumn<byte[]>(
                name: "FileName",
                table: "UserImage",
                type: "varbinary(200)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)");

            migrationBuilder.AlterColumn<string>(
                name: "GroupName",
                table: "Group",
                type: "varchar(255)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(50)");
        }
    }
}
