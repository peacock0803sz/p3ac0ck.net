{
  description = "p3ac0ck.net";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    git-hooks = {
      url = "github:cachix/git-hooks.nix";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs =
    {
      self,
      nixpkgs,
      flake-utils,
      git-hooks,
    }:
    flake-utils.lib.eachDefaultSystem (
      system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        # The hooks run the project's own prettier/eslint (and their plugins)
        # from node_modules, so they only work in the dev shell, not in
        # `nix flake check`.
        pre-commit = git-hooks.lib.${system}.run {
          src = ./.;
          hooks = {
            nixfmt.enable = true;
            prettier = {
              enable = true;
              name = "prettier";
              entry = "pnpm exec prettier --write --ignore-unknown";
              files = "^src/";
              language = "system";
            };
            eslint = {
              enable = true;
              name = "eslint";
              entry = "pnpm run lint";
              files = "^src/";
              language = "system";
              pass_filenames = false;
            };
          };
        };
      in
      {
        devShells.default = pkgs.mkShell {
          packages =
            with pkgs;
            [
              nodejs
              corepack
            ]
            ++ pre-commit.enabledPackages;
          inherit (pre-commit) shellHook;
        };
      }
    );
}
