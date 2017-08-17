package(default_visibility = ["//visibility:public"])

load("@build_bazel_rules_angular//:defs.bzl", "ng_module")

ng_module(
  name = "server",
  srcs = glob(["*.ts"]),
  tsconfig = ":tsconfig.json",
)
